import './Header.css';
import {Link, useLocation} from "react-router-dom";
import logo from "../resources/WineStoreLogo.png"
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router";

const CART_ICON = "https://cdn-icons-png.flaticon.com/512/34/34627.png";
const ACCOUNT_ICON = "https://cdn-icons.flaticon.com/png/512/2550/premium/2550260.png?token=exp=1651880899~hmac=bfffa971a4363b9a3d9bc28896605c84"
const SEARCH_ICON = "https://cdn-icons-png.flaticon.com/512/25/25313.png";

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const authDetails = useSelector(state => state)
    const navigate = useNavigate()
    const [ search, setSearch ] = useState();
    const [open, setOpen] = useState(false);

    const onClick = () => {
        dispatch({type: "ADD_SEARCH_PARAM", payload: search});
        redirect();
    }

    const pressEnter = (event) => {
        if(event.key === "Enter") {
            dispatch({type: "ADD_SEARCH_PARAM", payload: search});
            redirect();
        }
    }

    const onChange = (event) => {
        setSearch(event.target.value);
    }

    const redirect = () => {
        if (location.pathname !== "/") {
            navigate("/")
        }
    }

    const getCartItem = () => {
        if (authDetails.jwtToken) {
            return (
                <Link to="/cart">
                    <img className="header-cart-img cart-icon" src={CART_ICON} alt="cart_icon"/>
                </Link>
            );
        } else {
            return (
                <div onClick={newAlert}>
                    <img className="header-cart-img cart-icon" src={CART_ICON} alt="cart_icon"/>
                </div>
            );
        }
    }

    const newAlert = () => {
        alert("Перед здійсненням покупок потрібна авторизація");
    }

    const UserNavItem = () => {

        const UserNavItems = () => {
            if (authDetails.authorised) {
                return (
                        <div className="dropdown-block" onMouseLeave={() => setOpen(false)}>
                            <Link to={"/profile"}>
                                <p>Профіль</p>
                            </Link>
                            <Link to={"/salesHistory"}>
                                <p>Історія покупок</p>
                            </Link>
                            <Link to={"/logout"}>
                                <p>Вихід</p>
                            </Link>
                        </div>
                )
            } else {
                return (
                    <div className="dropdown-block" onMouseLeave={() => setOpen(false)}>
                        <Link to={"/auth"}>
                            <p>Вхід</p>
                        </Link>
                        <Link to={"/registration"}>
                            <p>Реєстрація</p>
                        </Link>
                    </div>
                )
            }
        }

        return (
            <div>
                <img className="header-account-img cart-icon" src={ACCOUNT_ICON} alt="cart_icon" onClick={() => setOpen(!open)}/>
                {open ? <UserNavItems /> : ''}
            </div>
        )
    }

    return (
        <div>
            <div>User: {authDetails.user.id + ' ' + authDetails.user.firstName}</div>
            <div>Token: {authDetails.jwtToken}</div>
            <header className="box">
                <Link to="/">
                    <img className="header-logo" alt="Header logo" src={logo}/>
                </Link>
                <div className="search-container">
                    <input value={search} className="search-input" onChange={onChange} onKeyPress={pressEnter}/>
                    <div className="search-icon" onClick={onClick}>
                        <img src={SEARCH_ICON} alt="Search icon"/>
                    </div>
                </div>
                <UserNavItem />
                {getCartItem()}
            </header>
        </div>
    );
}

export default Header;
import './Header.css';
import {Link, useLocation} from "react-router-dom";
import logo from '../resources/WineStoreLogo.png';
import cartIcon from '../resources/icons/cart_icon.png';
import accountIcon from '../resources/icons/account_icon.png';
import searchIcon from '../resources/icons/search_icon.png';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router";

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
                    <img className="header-cart-img cart-icon" src={cartIcon} alt="cart_icon"/>
                </Link>
            );
        } else {
            return (
                <div onClick={newAlert}>
                    <img className="header-cart-img cart-icon" src={cartIcon} alt="cart_icon"/>
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
                <img className="header-account-img cart-icon" src={accountIcon} alt="account_icon" onClick={() => setOpen(!open)}/>
                {open ? <UserNavItems /> : ''}
            </div>
        )
    }

    return (
        <div>
            <header className="heeader">
                <Link to="/">
                    <img className="header-logo" alt="Header logo" src={logo}/>
                </Link>
                <div className="search-container">
                    <input id="header-search" value={search} autoComplete="off" className="search-input" onChange={onChange} onKeyPress={pressEnter}/>
                    <div className="search-icon" onClick={onClick}>
                        <img src={searchIcon} alt="Search icon"/>
                    </div>
                </div>
                <UserNavItem />
                {getCartItem()}
            </header>
        </div>
    );
}

export default Header;
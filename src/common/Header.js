import './Header.css';
import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <Link to="/" >
                <p className="header-home">Головна</p>
            </Link>
            <Link to="/cart" >
                <p className="header-cart">Корзина</p>
            </Link>
        </header>
    );
}

export default Header;
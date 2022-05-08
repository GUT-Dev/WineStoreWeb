import './App.css';
import Header from "./common/Header";
import Wines from "./wines/Wines";
import Footer from "./common/Footer";
import Wine from "./wine/Wine";
import {Route, useParams} from "react-router-dom";
import {Routes} from "react-router";
import RegistrationForm from "./auth/registration/RegistrationForm";
import Authorisation from "./auth/authorisation/Authorisation";
import Cart from "./cart/Cart";

const App = () => {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={"/"} element={<Wines/>}/>
                <Route path={"/wine/:id"} element={<WineEl/>}/>
                <Route path={"/registration"} element={<RegistrationForm/>}/>
                <Route path={"/auth"} element={<Authorisation/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
            </Routes>
            <Footer/>
        </div>
    );

    function WineEl() {
        let {id} = useParams();
        return (<Wine id={id}/>);
    }
}

export default App;

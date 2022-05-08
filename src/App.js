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
import AddWine from "./managerPanel/AddWine/AddWine";
import {useSelector} from "react-redux";
import ManagerPanel from "./managerPanel/ManagerPanel";

const App = () => {

    const permissions = useSelector(state => state.user.roles)

    const managerPanel = () => {
        if(permissions.includes("MANAGER")) {
            return <ManagerPanel />
        }
    }

    return (
        <div className="App">
            <Header/>
            {managerPanel()}
            <Routes>
                <Route path={"/"} element={<Wines/>}/>
                <Route path={"/wine/:id"} element={<WineEl/>}/>
                <Route path={"/registration"} element={<RegistrationForm/>}/>
                <Route path={"/auth"} element={<Authorisation/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/addWine"} element={<AddWine/>}/>
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

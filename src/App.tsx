import './App.css';
import Header from "./common/Header";
import Wines from "./wines/Wines";
import Footer from "./common/Footer";
import WinePage from "./wine/WinePage";
import {Route, useParams} from "react-router-dom";
import {Routes} from "react-router";
import RegistrationForm from "./auth/registration/RegistrationForm";
import Authorisation from "./auth/authorisation/Authorisation";
import Cart from "./cart/Cart";
import AddWine from "./managerPanel/AddWine/AddWine";
import {useSelector} from "react-redux";
import ManagerPanel from "./managerPanel/ManagerPanel";
import Logout from "./auth/Logout";
import SalesHistory from "./user/salesHistory/SalesHistory";
import Orders from "./managerPanel/Orders/Orders";
import UserPage from "./user/userPage/UserPage";

const App = () => {

    // @ts-ignore
    const permissions = useSelector(state => state.user.roles);
    // @ts-ignore
    const authorised = useSelector(state => state.authorised);

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
                <Route path={"/"} element={<Wines />}/>
                <Route path={"/wine/:id"} element={<WineEl/>}/>
                <Route path={"/auth"} element={<Authorisation/>}/>
                <Route path={"/logout"} element={<Logout />}/>
                <Route path={"/registration"} element={<RegistrationForm/>}/>
                {authorised ? <Route path={"/cart"} element={<Cart/>}/> : null}
                {authorised ? <Route path={"/salesHistory"} element={<SalesHistory/>}/> : null}
                {authorised ? <Route path={"/salesHistory"} element={<SalesHistory/>}/> : null}
                {authorised ? <Route path={"profile"} element={<UserPage />}/> : null}
                {permissions.includes("MANAGER") ? <Route path={"/manager/addWine"} element={<AddWine/>}/> : null}
                {permissions.includes("MANAGER") ? <Route path={"/manager/orders"} element={<Orders/>}/> : null}
            </Routes>
            <Footer/>
        </div>
    );

    function WineEl() {
        const params = useParams();
        // @ts-ignore
        return (<WinePage id={params.id as bigint}/>);
    }
}

export default App;

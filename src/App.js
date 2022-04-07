import './App.css';
import Header from "./common/Header";
import Wines from "./wines/Wines";
import Footer from "./common/Footer";
import React, {Component} from "react";
import Wine from "./wine/Wine";
import {Route, useParams} from "react-router-dom";
import {Routes} from "react-router";

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={"/"} element={<Wines />} />
                    <Route path={"/wine/:id"} element={<WineEl />} />
                </Routes>
                <Footer/>
            </div>
        );

        function WineEl() {
            let {id} = useParams();
            return (<Wine id={id} />);
        }
    }
}

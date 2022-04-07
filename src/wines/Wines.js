import './Wines.css';
import Items from "./items/Items";
import Nav from "./nav/Nav";
import {Component} from "react";

export default class Wines extends Component {

    render() {
        return(
            <div className="wines">
                <Nav />
                <Items />
            </div>
        );
    }
}
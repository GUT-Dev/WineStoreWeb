import './Wine.css';
import WineElement from "./WineElement/WineElement";
import Reviews from "./Reviews/Reviews";
import {Component} from "react";

export default class Wine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <WineElement id={this.props.id}/>
                <Reviews id={this.props.id}/>
            </div>
        );
    }
}
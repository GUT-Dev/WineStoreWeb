import './Review.css';
import {Component} from "react";

export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = props.item
    }

    render() {
        return (
            <div className="review-item">
                <h3>{this.state.user.firstName} {this.state.user.lastName}</h3>
                <p>{this.state.message}</p>
                <p>{this.state.rating}</p>
            </div>
        );
    }
}
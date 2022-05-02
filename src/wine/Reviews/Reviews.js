import './Reviews.css';
import Review from "./Review/Review";
import AddReview from "./AddReview/AddReview";
import {Component} from "react";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const REVIEWS_PATH = BASE_PATH + "/review?wineId="

export default class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        axios.get(REVIEWS_PATH + this.state.id)
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    reviewHeader() {
        if (this.state.items.length > 0) {
            return <h2 id="reviews-item-name">Відгуки:</h2>;
        } else {
            return <h2 id="reviews-item-name">Додай відгук першим</h2>;
        }
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return (<p> Error {error.message}</p>)
        } else if (!isLoaded) {
            return (<p> Зфгрузка....</p>)
        } else {
            return (
                <div className="reviews">
                    {this.reviewHeader()}
                    {items.map(item =>
                        <Review item={item} key={item.id}/>
                    )}
                    <AddReview />
                </div>
            );
        }

    }
}
import './AddReview.scss';
import {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

const BASE_PATH = "http://localhost:8080"
const ADD_REVIEW_PATH = BASE_PATH + "/review/add"

const AddReview = (props) => {
    const token = useSelector(state => state.jwtToken);
    let [ rating, setRating ] = useState(3);
    let [ review, setReview ] = useState('');

    async function addReview() {
        let data = {
            wineId: props.id,
            message: review,
            rating: rating
        }

        await axios.post(ADD_REVIEW_PATH, data,
            {
                headers: {Authorization: 'Bearer ' + token}
            }
        )
            .finally()

        props.update();
    }

    if (token) {
        return (
            <div className="add-review-main box">
                <h3 className="add-review-header">Додати відгук</h3>
                <textarea maxLength="180" className="add-review-textarea"
                          onChange={(e) => setReview(e.target.value)}>{review}</textarea>
                <div className="add-review-buttons">
                    <div className="rating-holder">
                        <div className="c-rating c-rating--small" data-rating-value={rating}>
                            <button onClick={() => setRating(1)}/>
                            <button onClick={() => setRating(2)}/>
                            <button onClick={() => setRating(3)}/>
                            <button onClick={() => setRating(4)}/>
                            <button onClick={() => setRating(5)}/>
                        </div>
                    </div>
                    <button className="add-review-button" onClick={addReview}>Додати</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="add-review-main box">
                <h3 className="add-review-header">Щоб додати відгук потрібна авторизація</h3>
            </div>
        )
    }
}

export default AddReview;
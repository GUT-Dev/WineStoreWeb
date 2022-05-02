import './AddReview.scss';
import {useState} from "react";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const ADD_REVIEW_PATH = BASE_PATH + "/review/add"

const AddReview = (props) => {
    let [ rating, setRating ] = useState(3);
    let [ review, setReview ] = useState('');
    const id = props.id;
    const update = props.update;

    async function addReview() {
        let data = {
            wineId: id,
            message: review,
            rating: rating
        }

        await axios.post(ADD_REVIEW_PATH, data,
            {
                headers: {Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi50ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTY1MjIxNjQwMH0.WF-4v82ZSQCdq-x4HuSA7BrZWQlGjwFYlYQJZIFjMe6FHgvcmD8a30GxTPz1qIb9au2XLMFYzIDAFFv9GTUrKw`}
            }
        )
            .finally()

        update();
    }

    return (
        <div className="add-review-main">
            <textarea className="add-review-textarea" onChange={(e) => setReview(e.target.value)}>{review}</textarea>
            <div className="add-review-buttons">
                <div className="rating-holder">
                    <div className="c-rating c-rating--small" data-rating-value={rating}>
                        <button onClick={() => setRating(1)} />
                        <button onClick={() => setRating(2)} />
                        <button onClick={() => setRating(3)} />
                        <button onClick={() => setRating(4)} />
                        <button onClick={() => setRating(5)} />
                    </div>
                </div>
                <button className="add-review-button" onClick={addReview}>Додати</button>
            </div>

        </div>
    );
}
export default AddReview;
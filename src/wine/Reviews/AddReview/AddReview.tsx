import './AddReview.scss';
import {useState} from "react";
import {useSelector} from "react-redux";
import {addReViewForWine} from "../../../API/reviewAPI";

const AddReview = ({id, reload}: {id: bigint, reload: VoidFunction}) => {

    // @ts-ignore
    const token = useSelector(state => state.jwtToken);

    const [ rating, setRating ] = useState<number>(3);
    const [ review, setReview ] = useState<string>('');

    const addReview = async () => {
        await addReViewForWine({wineId: id, message: review, rating: rating}, token)
            .finally();

        reload();
    }

    if (token) {
        return (
            <div className="add-review-main box">
                <h3 className="add-review-header">Додати відгук</h3>
                <textarea maxLength={180} className="add-review-textarea"
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
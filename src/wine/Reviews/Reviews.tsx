import './Reviews.css';
import Review from "./Review/Review";
import AddReview from "./AddReview/AddReview";
import {useEffect, useState} from "react";
import {getReviewsForWine} from "../../API/reviewAPI";
import {CustomerReview} from "../../model/wine/CustomerReview";

const Reviews = ({wineId}: {wineId: bigint}) => {
    const [items, setItems] = useState<CustomerReview []>([]);

    useEffect(() => reload(), [wineId])

    const reload = () => {
        getReviewsForWine(wineId)
            .then(r => setItems(r))
    }

    const reviewHeader = () => {
        if (items.length > 0) {
            return <h2 id="reviews-item-name">Відгуки:</h2>;
        } else {
            return <h2 id="reviews-item-name">Додай відгук першим</h2>;
        }
    }

    return (
        <div className="reviews box">
            {reviewHeader()}
            {items.map(item =>
                <Review item={item}/>
            )}
            <AddReview id={wineId} reload={reload}/>
        </div>
    );


}

export default Reviews;
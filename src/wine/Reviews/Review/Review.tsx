import './Review.css';
import {CustomerReview} from "../../../model/wine/CustomerReview";

const Review = ({item}: {item: CustomerReview}) => {

    const getRating = () => {
        const rating = item.rating;
        return (
            <div className="review-rating">
                {getStar(rating > 0)}
                {getStar(rating > 1)}
                {getStar(rating > 2)}
                {getStar(rating > 3)}
                {getStar(rating > 4)}
            </div>
        )
    }

    const getStar = (isChecked: boolean) => {
        if(isChecked) {
            return (<span className="fa fa-star checked-star"/>);
        } else {
            return (<span className="fa fa-star unchecked-star"/>);
        }
    }

    return (
        <div className="review-item box">
            {getRating()}
            <h3>{item.user.firstName} {item.user.lastName}</h3>
            <p>{item.message}</p>
        </div>
    );
}

export default Review;
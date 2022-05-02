import './Review.css';

const Review = (props) => {
    let item = props.item;

    return (
        <div className="review-item">
            <h3>{item.user.firstName} {item.user.lastName}</h3>
            <p>{item.message}</p>
            <p>{item.rating}</p>
        </div>
    );
}

export default Review;
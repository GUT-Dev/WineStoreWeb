import './AddReview.css';

function AddReview() {
    return (
        <div className="add-review-b">
            <textarea className="add-review-textarea">Новий відгук</textarea>
            <button className="add-review-button">Додати відгук [Future]</button>
        </div>
    );
}

export default AddReview;
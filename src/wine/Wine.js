import './Wine.css';
import WineElement from "./WineElement/WineElement";
import Reviews from "./Reviews/Reviews";

export default function Wine(props) {
    return (
        <div>
            <WineElement id={props.id}/>
            <Reviews id={props.id}/>
        </div>
    );
}
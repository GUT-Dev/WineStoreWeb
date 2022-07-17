import './Wine.css';
import WineElement from "./WineElement/WineElement";
import Reviews from "./Reviews/Reviews";

const WinePage = ({id}: {id: bigint}) => {
    return (
        <div>
            <WineElement id={id}/>
            <Reviews wineId={id}/>
        </div>
    );
}

export default WinePage;
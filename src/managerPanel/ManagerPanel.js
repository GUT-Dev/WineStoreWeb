import './ManagerPanel.css';
import {Link} from "react-router-dom";

const ManagerPanel = () => {
    return (
        <div className="manager-panel-main box">
            <Link to="addWine">
                <h1 className="add-wine box">Додати  продукт</h1>
            </Link>
            <h1 className="manager-panel-header">Панель менеджера</h1>
        </div>
    )
}

export default ManagerPanel;
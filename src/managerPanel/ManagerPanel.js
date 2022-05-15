import './ManagerPanel.css';
import {Link} from "react-router-dom";

const ManagerPanel = () => {
    return (
        <div className="manager-panel-main box">
            <div className="manager-panel-items">
                <Link to="/manager/addWine">
                    <h1 className="manager-panel-item box">Додати товар</h1>
                </Link>
                <Link to="/manager/editWines">
                    <h1 className="manager-panel-item box">Редагувати товари</h1>
                </Link>
                <Link to="/manager/orders">
                    <h1 className="manager-panel-item box">Трекінг замовлень</h1>
                </Link>
            </div>
            <h1 className="manager-panel-header">Панель менеджера</h1>
        </div>
    )
}

export default ManagerPanel;
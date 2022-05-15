import './SalesHistory.css'
import axios from "axios";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {convertTrackingStatus} from "../../utils/StringConverter";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/cart/history"

const SalesHistory = () => {
    const token = useSelector(state => state.jwtToken);
    const [state, setItems] = useState([]);

    useEffect(() => {
        axios.get(ELEMENT_PATH, {headers: {Authorization: 'Bearer ' + token}})
            .then(res => setItems(res.data))
    }, [token])

    const SalesHistoryItem = (props) => {
        return (
            <div className="sales-history-item box">
                <div className="sales-history-item-header">
                    <p>Замовлення № {props.item.id}</p>
                    <div className="order-status-block">
                        {convertTrackingStatus(props.item.trackingStatus)}
                    </div>
                </div>
                <p className="sold-date">Дата покупки: {props.item.buyDate}</p>
                <table className="cart-items-table">
                    <tr>
                        <th>Найменування товару</th>
                        <th>Ціна</th>
                        <th>Знижка</th>
                        <th>Кількість</th>
                        <th>Сума з знижкою</th>
                    </tr>
                    {props.item.items.map(item =>
                        <SalesHistoryWineItem item={item} key={item.id}/>
                    )}
                </table>
                <div className="sales-history-total">
                    <p>Сума без знижки: {props.item.totalPrice}</p>
                    <p>Сума з врахуванням знижки: {props.item.totalPriceWithSale}</p>
                </div>
            </div>
        )
    }

    const SalesHistoryWineItem = (props) => {
        return (
            <tr className="sales-history-row">
                <td>{props.item.wine.name}</td>
                <td className="text-center">{props.item.wine.price}</td>
                <td className="text-center">{props.item.wine.discount + '%'}</td>
                <td className="text-center">{props.item.amount}</td>
                <td className="text-center">{(props.item.wine.priceWithSale * props.item.amount).toFixed(2)}</td>
            </tr>
        )
    }

    return (
        <div className="sales-history-main">
            <h3>Історія покупок</h3>
            {state.map(item =>
                <SalesHistoryItem item={item} key={item.id}/>
            )}
        </div>
    )
}

export default SalesHistory;
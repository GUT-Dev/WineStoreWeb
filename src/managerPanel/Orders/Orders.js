import "./Orders.css"
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {convertTrackingStatus} from "../../utils/StringConverter";

const BASE_PATH = "http://localhost:8080";
const ELEMENT_PATH = BASE_PATH + "/manager/orders";
const CHANGE_STATUS_PATH = ELEMENT_PATH + "/changeStatus";

const Orders = () => {
    const token = useSelector(state => state.jwtToken)
    const [filters, setFilters] = useState({
        firstName: null,
        lastName: null,
        orderId: null,
        status: [],
    })
    let tempFilters = filters;

    const convertAddressToString = (props) => {
        const emptyAddress = {
            postCode: '',
            land: '',
            city: '',
            street: '',
            homeNumber: ''
        }
        const address = props == null ? emptyAddress : props
        return (
            <div>
                <h4>Адреса:</h4>
                <p>Місто: {address.city}</p>
                <p>Вулиця: {address.street}</p>
                <p>Будинок: {address.homeNumber}</p>
                <p>Поштовий індекс: {address.postCode}</p>
            </div>
        );
    }

    const changeFilter = (event) => {
        if (event.target.checked) {
            tempFilters = {
                ...tempFilters,
                status: [...tempFilters.status, event.target.id]
            }
        } else {
            let id = tempFilters.status.indexOf(event.target.id);
            tempFilters.status.splice(id, 1);
        }
    }

    const Order = (props) => {
        const [status, setStatus] = useState(props.item.trackingStatus);

        const changeStatus = (event) => {
            let newStatus = null;
            if (event.target.id === 'cancel') {
                newStatus = 'CANCELED';
            } else if (event.target.id === 'confirm') {
                newStatus = 'IN_PROGRESS'
            } else if (event.target.id === 'next') {
                switch (props.item.trackingStatus) {
                    case 'IN_PROGRESS' :
                        newStatus = 'SENT';
                        break;
                    case 'SENT' :
                        newStatus = 'ARRIVED';
                        break;
                    case 'ARRIVED' :
                        newStatus = 'RECEIVED';
                        break;
                }
            }

            if (newStatus != null) {
                const data = {
                    cartId: props.item.id,
                    status: newStatus
                }
                axios.put(CHANGE_STATUS_PATH, data, {headers: {Authorization: 'Bearer ' + token}})
                    .then(res => {
                        if (res.status === 200) {
                            setStatus(res.data);
                            props.item.trackingStatus = res.data
                        }
                    })
            }
        }

        return (
            <div className="orders-item box">
                <div className="orders-item-header">
                    <p>Замовлення № {props.item.id}</p>
                    <div className="order-status-block">
                        {convertTrackingStatus(status)}
                    </div>
                </div>
                <p className="sold-date">Дата створення заявки: {props.item.buyDate}</p>
                <table className="orders-table">
                    <tr>
                        <th>Найменування товару</th>
                        <th>Ціна</th>
                        <th>Знижка</th>
                        <th>Кількість</th>
                        <th>Сума з знижкою</th>
                    </tr>
                    {props.item.items.map(item =>
                        <OrderRow item={item} key={item.id}/>
                    )}
                </table>
                <div className="orders-total">
                    <p>Сума без знижки: {props.item.totalPrice}</p>
                    <p>Сума з врахуванням знижки: {props.item.totalPriceWithSale}</p>
                </div>
                <div className="orders-user">
                    <p>{props.item.user.firstName + ' ' + props.item.user.lastName}</p>
                    <p>Електронна пошта: {props.item.user.email}</p>
                    <p>Номер телефону: {props.item.user.phoneNumber}</p>
                </div>
                <div className="orders-user-address">
                    {convertAddressToString(props.item.user.address)}
                </div>
                <div className="orders-actions">
                    {status === 'NEW' ? <button onClick={changeStatus} id={'confirm'}
                                                style={{backgroundColor: 'yellowgreen'}}>Підтвердити</button> : null}
                    {status !== 'CANCELED' && status !== 'RECEIVED' ?
                        <button onClick={changeStatus} id={'next'} style={{backgroundColor: 'yellow'}}>Наступний
                            крок</button> : null}
                    {status !== 'CANCELED' && status !== 'RECEIVED' ? <button onClick={changeStatus} id={'cancel'}
                                                                              style={{backgroundColor: '#f6565c'}}>Відмінити</button> : null}
                </div>
            </div>
        )
    }

    const OrderRow = (props) => {
        return (
            <tr>
                <td>{props.item.wine.name}</td>
                <td className="text-center">{props.item.wine.price}</td>
                <td className="text-center">{props.item.wine.discount + '%'}</td>
                <td className="text-center">{props.item.amount}</td>
                <td className="text-center">{(props.item.wine.priceWithSale * props.item.amount).toFixed(2)}</td>
            </tr>
        )
    }

    const onChange = (event) => {
        tempFilters = {
            ...tempFilters,
            [event.target.id]: event.target.value
        }
    }

    const search = (event) => {
        event.preventDefault();
        setFilters(tempFilters);
    }

    const OrdersItems = (props) => {
        const [items, setItems] = useState([]);

        useEffect(() => {
            axios.get(ELEMENT_PATH + getFilters(), {headers: {Authorization: 'Bearer ' + token}})
                .then(res => setItems(res.data))
        }, [props.filters])

        const getFilters = () => {
            let filtersString = '?';

            if (props.filters.firstName != null) {
                filtersString += 'firstName=' + props.filters.firstName + '&';
            }
            if (props.filters.lastName != null) {
                filtersString += 'lastName=' + props.filters.lastName + '&';
            }
            if (props.filters.orderId != null) {
                filtersString += 'orderId=' + props.filters.orderId + '&';
            }
            if (props.filters.status.length > 0) {
                filtersString += 'status=' + props.filters.status + '&';
            }

            return filtersString;
        }

        return (
            items.map(item =>
                <Order item={item} key={item.id}/>)

        )
    }

    return (
        <div className="orders-main">
            <h3>Трекінг замовлень</h3>
            <div className="orders-filters-statuses">
                <div className="orders-filters-status">
                    <input type="checkbox" id={"NEW"} onClick={changeFilter}/>
                    <span>Нове</span>
                </div>
                <div className="orders-filters-status">
                    <input type="checkbox" id={"IN_PROGRESS"} onClick={changeFilter}/>
                    <span>Комплектується</span>
                </div>
                <div className="orders-filters-status">
                    <input type="checkbox" id={"SENT"} onClick={changeFilter}/>
                    <span>Відправлене</span>
                </div>
                <div className="orders-filters-status">
                    <input type="checkbox" id={"ARRIVED"} onClick={changeFilter}/>
                    <span>Прибуло</span>
                </div>
                <div className="orders-filters-status">
                    <input type="checkbox" id={"RECEIVED"} onClick={changeFilter}/>
                    <span>Отримане</span>
                </div>
                <div className="orders-filters-status">
                    <input type="checkbox" id={"CANCELED"} onClick={changeFilter}/>
                    <span>Відмінене</span>
                </div>
            </div>
            <div className="orders-filters">
                <div className="orders-filters-by-name">
                    <div>
                        Ім'я
                        <input type="text" value={tempFilters.firstName} onChange={onChange} id="firstName"/>
                    </div>
                    <div>
                        Прізвище
                        <input type="text" value={tempFilters.lastName} onChange={onChange} id="lastName"/>
                    </div>
                    <div>
                        Номер замовлення
                        <input type="number" style={{width: 100 + 'px'}} value={tempFilters.orderId}
                               onChange={onChange} id="orderId"/>
                    </div>
                </div>
                <button onClick={search}>Пошук</button>
            </div>
            <OrdersItems filters={filters}/>
        </div>
    )
}

export default Orders;
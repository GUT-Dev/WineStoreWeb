import './WineElement.css';
import axios from "axios";
import {useEffect, useState} from "react";
import checkImg from "../../utils/DefaultImg";
import addToCartIcon from '../../resources/icons/add_to_cart.png'
import {convertType, convertSweetness, convertAvailableStatus} from '../../utils/StringConverter'
import {useSelector} from "react-redux";
import defaultImg from "../../resources/default_img.png";
import editIcon from "../../resources/icons/edit_icon.png"
import AddWineModal from "../../modals/EditWineModal/EditWineModal";
import EditWineModal from "../../modals/EditWineModal/EditWineModal";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine/"
const CART_PATH = BASE_PATH + "/cart"

const WineElement = (props) => {
    const token = useSelector(state => state.jwtToken);
    const roles = useSelector(state => state.user.roles);
    const [editModalOpen, setEditModalOpen] = useState(false);
    let [state, setState] = useState({
            error: null,
            isLoaded: false,
            item: []
        }
    )

    useEffect(
        () => {
            axios.get(ELEMENT_PATH + props.id)
                .then(
                    (result) => {
                        setState({
                            ...state,
                            isLoaded: true,
                            item: result.data
                        });
                    },
                    (error) => {
                        setState({
                            ...state,
                            isLoaded: true,
                            error
                        });
                    }
                )
        }, [props, !editModalOpen]
    );

    const getRating = () => {
        const rating = state.item.rating;
        return (
            <div className="wine-element-rating">
                {getStar(rating > 0)}
                {getStar(rating > 1)}
                {getStar(rating > 2)}
                {getStar(rating > 3)}
                {getStar(rating > 4)}
            </div>
        )
    }

    const getStar = (isChecked) => {
        if(isChecked) {
            return (<span className="fa fa-star wine-element-star checked-star"/>);
        } else {
            return (<span className="fa fa-star wine-element-star unchecked-star"/>);
        }
    }

    const getPrice = () => {
        if(!state.item.available) {
            return (
                <div className="price-container">
                    <h4 className="wine-unavailable">{convertAvailableStatus(state.item.availableStatus)}</h4>
                </div>
            );
        } else if (state.item.discount === 0) {
            return (
                <div className="price-container">
                    <h4 className="wine-price price">{state.item.price} грн.</h4>
                </div>
            );
        } else {
            return (
                <div className="price-container">
                    <h3 className="old-price"> {state.item.price}</h3>
                    <h4 className="wine-price sale">{state.item.priceWithSale} грн.</h4>
                </div>
            );
        }
    }

    const getButton = () => {
        if (state.item.available) {
            return (
                <div className="wine-element-button" onClick={addToCart}>
                    <img src={addToCartIcon} alt="Add to cart icon"/>
                </div>
            )
        }
    }

    const addToCart = () => {
        if (token) {
            axios.put(CART_PATH,
                {
                    wineId: props.id,
                    amount: 1
                },
                {
                    headers: {Authorization: 'Bearer ' + token}
                })
                .finally()
        } else {
            alert("Перед покупками потрібна авторизація")
        }
    }

    function setDefaultImg(event) {
        event.target.src = defaultImg;
    }

    if (state.error) {
        return (<p> Error {state.error.message}</p>)
    } else if (!state.isLoaded) {
        return (<p> Зaгрузка....</p>)
    } else {
        return (
            <div className="wine-element">
                <div className="wine-element-item">
                    {getRating()}
                    <div className="wine-img-container">
                        <img onError={setDefaultImg} src={checkImg(state.item.img)} alt="wine logo"/>
                        {state.item.visible ? null : (
                            <div className="not-available label">
                                <p>Приховано</p>
                            </div>
                        )}
                    </div>
                    <div className="descriptions">
                        {roles.includes("MANAGER") ? (
                            <div className="wine-element-edit-button" onClick={() => setEditModalOpen(!editModalOpen)}>
                                <img src={editIcon} alt="edit icon"/>
                            </div>
                        ) : null}
                        <h3 id="wine-name" className="item-name">{state.item.name}</h3>
                        <p>Тип напою: {convertType(state.item.type)}</p>
                        <p>Бренд: {state.item.brand.name}</p>
                        <p>Країна: {state.item.land.name}</p>
                        <p>Солодкість: {convertSweetness(state.item.sweetness)}</p>
                        <p>Міцність: {state.item.strength}%</p>
                        {getButton()}
                        {getPrice()}
                    </div>
                </div>
                <div className="additional-info box">
                    <p>Регіон: {state.item.region}</p>
                    <p>Вміст цукру: {state.item.sugarAmount} гр/л</p>
                    <p>Опис: {state.item.descriptions}</p>
                </div>

                <EditWineModal open={editModalOpen} setOpen={setEditModalOpen} item={state.item} />
            </div>
        );
    }
}

export default WineElement;
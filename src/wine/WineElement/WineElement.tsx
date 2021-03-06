import './WineElement.css';
import React, {SyntheticEvent, useEffect, useState} from "react";
import checkImg from "../../utils/DefaultImg";
// @ts-ignore
import addToCartIcon from '../../resources/icons/add_to_cart.png'
// @ts-ignore
import defaultImg from "../../resources/default_img.png";
// @ts-ignore
import editIcon from "../../resources/icons/edit_icon.png"
import {convertType, convertSweetness, convertAvailableStatus} from '../../utils/StringConverter'
import {useSelector} from "react-redux";
import EditWineModal from "../../modals/EditWineModal/EditWineModal";
import {getWine} from "../../API/productAPI";
import {Wine} from "../../model/wine/Products";
import {putInCart} from "../../API/cartAPI";

const WineElement = ({id}: {id: bigint}) => {

    // @ts-ignore
    const token: string = useSelector(state => state.jwtToken);
    // @ts-ignore
    const roles = useSelector(state => state.user.roles);
    const [editModalOpen, setEditModalOpen] = useState(false);
    // @ts-ignore
    const [item, setItem] = useState<Wine>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        getWine(id)
                .then(r => {
                        setIsLoaded(true);
                        setItem(r);
                })
        }, [id, !editModalOpen]
    );

    const getRating = () => {
        const rating = item.rating;
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

    const getStar = (isChecked: boolean) => {
        if(isChecked) {
            return (<span className="fa fa-star wine-element-star checked-star"/>);
        } else {
            return (<span className="fa fa-star wine-element-star unchecked-star"/>);
        }
    }

    const getPrice = () => {
        if(!item.available) {
            return (
                <div className="price-container">
                    <h4 className="wine-unavailable">{convertAvailableStatus(item.availableStatus)}</h4>
                </div>
            );
        } else if (item.discount === 0) {
            return (
                <div className="price-container">
                    <h4 className="wine-price price">{item.price} ??????.</h4>
                </div>
            );
        } else {
            return (
                <div className="price-container">
                    <h3 className="old-price"> {item.price}</h3>
                    <h4 className="wine-price sale">{item.priceWithSale} ??????.</h4>
                </div>
            );
        }
    }

    const getButton = () => {
        if (item.available) {
            return (
                <div className="wine-element-button" onClick={addToCart}>
                    <img src={addToCartIcon} alt="Add to cart icon"/>
                </div>
            )
        }
    }

    const addToCart = () => {
        if (token) {
            putInCart(id, 1, token)
                    .finally();
        } else {
            alert("?????????? ?????????????????? ???????????????? ??????????????????????");
        }
    }

    function setDefaultImg(event: SyntheticEvent<HTMLImageElement, Event>) {
        // @ts-ignore
        event.target.src = defaultImg;
    }

    if (!isLoaded) {
        return null;
    } else {
        return (
            <div className="wine-element">
                <div className="wine-element-item">
                    {getRating()}
                    <div className="wine-img-container">
                        <img onError={setDefaultImg} src={checkImg(item.img)} alt="wine logo"/>
                        {item.visible ? null : (
                            <div className="not-available label">
                                <p>??????????????????</p>
                            </div>
                        )}
                    </div>
                    <div className="descriptions">
                        {roles.includes("MANAGER") ? (
                            <div className="wine-element-edit-button" onClick={() => setEditModalOpen(!editModalOpen)}>
                                <img src={editIcon} alt="edit icon"/>
                            </div>
                        ) : null}
                        <h3 id="wine-name" className="item-name">{item.name}</h3>
                        <p>?????? ??????????: {convertType(item.type)}</p>
                        <p>??????????: {item.brand.name}</p>
                        <p>????????????: {item.land.name}</p>
                        <p>????????????????????: {convertSweetness(item.sweetness)}</p>
                        <p>????????????????: {item.strength}%</p>
                        {getButton()}
                        {getPrice()}
                    </div>
                </div>
                <div className="additional-info box">
                    <p>????????????: {item.region}</p>
                    <p>?????????? ??????????: {item.sugarAmount} ????/??</p>
                    <p>????????: {item.descriptions}</p>
                </div>

                <EditWineModal open={editModalOpen} setOpen={setEditModalOpen} item={item} />
            </div>
        );
    }
}

export default WineElement;
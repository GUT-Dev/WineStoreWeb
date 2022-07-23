import './Cart.css';
import CartItem from "./CartItem/CartItem";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SuccessModal from "../modals/SuccessModal/SuccessModal";
import ErrorModal from "../modals/ErrorModal/ErrorModal";
import {CartModel} from "../model/cart/CartModel";
import {cartBuy, getCart} from "../API/cartAPI";

const Cart = () => {

    // @ts-ignore
    const token = useSelector(state => state.jwtToken);

    // @ts-ignore
    const [item, setItem] = useState<CartModel>({});

    const [loaded, setLoaded] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    useEffect(
        () => {
            loadCart()
        }, [token]
    );

    const loadCart = () => {
        getCart(token)
            .then(r => {
                setItem(r);
                setLoaded(true);
            })
    }

    const buy = async () => {
        await cartBuy(token)
            .then(res => {
                    if (res.status === 200) {
                        setModalOpen(true)
                        loadCart();
                    } else {
                        setErrorModalOpen(true)
                    }
                }
            );
    }

    if(loaded) {
        return (
            <div className="cart-items">
                <h1>Корзина</h1>
                {item.items.map(item =>
                    <CartItem item={item} update={loadCart.bind(this)} key={item.id}/>
                )}
                <div hidden={item.items.length === 0} className="cart-total">
                    <p>Сума: {item.totalPrice} грн</p>
                    <p>Сума зі знижкою: {item.totalPriceWithSale} грн</p>
                    <p>Загальна знижка: {item.totalSalePercent}%</p>
                    <button className="cart-button" onClick={buy}>Купити</button>
                </div>
                <SuccessModal text="Покупка успішна" open={modalOpen} setOpen={setModalOpen}/>
                <ErrorModal open={errorModalOpen} setOpen={setErrorModalOpen} text={undefined} descriptions={undefined}/>
            </div>
        );
    } else {
        return (
            <p>Загрузка...</p>
        )
    }

}

export default Cart;
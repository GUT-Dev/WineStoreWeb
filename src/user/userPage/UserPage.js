import "./UserPage.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import editIcon from "../../resources/icons/edit_icon.png"
import saveIcon from "../../resources/icons/save_icon.png"
import SuccessModal from "../../modals/SuccessModal/SuccessModal";

const BASE_PATH = "http://localhost:8080"
const USER_PATH = BASE_PATH + "/user"
const LOAD_USER_PATH = USER_PATH + "/load";
const RESET_PASSWORD_PATH = USER_PATH + "/reset-password"
const ADDRESS_PATH = BASE_PATH + "/address";

const defaultAddress = {
    id: null,
    postCode: null,
    land: null,
    city: null,
    street: null,
    homeNumber: null,
};

const UserPage = () => {
    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.jwtToken);
    const [user, setUser] = useState({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        address: defaultAddress
    });
    const [userPassword, setUserPassword] = useState({
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
    });
    const [wrongPassword, setWrongPassword] = useState(false);
    const [activeInput, setActiveInput] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [successText, setSuccessText] = useState(null);

    const getUser = async () => {
        await axios.get(LOAD_USER_PATH, {headers: {Authorization: 'Bearer ' + jwtToken}})
            .then(res => {
                if (!res.data.address) {
                    res.data.address = defaultAddress;
                }
                setUser(res.data);
                dispatch({type: "SET_USER", payload: res.data});
            })
    }

    useEffect(() => {
        getUser();
    }, [])

    const saveAddress = async (event) => {
        event.preventDefault();
        await axios.post(ADDRESS_PATH, user.address, {headers: {Authorization: 'Bearer ' + jwtToken}})
            .then(r => {
                setUser({...user, address: r.data});
                setSuccessText("Адресу успішно оновлено");
                setModalOpen(true);
            })
    }

    const saveUser = async () => {
        await axios.put(USER_PATH, user, {headers: {Authorization: 'Bearer ' + jwtToken}})
            .then(r => {
                prepareDataAfterSave(r.data)
            });
    }

    const prepareDataAfterSave = async (jwtToken) => {
        await setActiveInput(true);
        dispatch({type: "LOGIN", payload: jwtToken});
        await getUser();
        await setSuccessText("Успішно");
        await setModalOpen(true);
    }

    const resetPassword = async (event) => {
        setWrongPassword(false);
        event.preventDefault();
        await axios.put(RESET_PASSWORD_PATH, userPassword, {headers: {Authorization: 'Bearer ' + jwtToken}})
            .then(r => {
                setSuccessText("Пароль успішно змінено")
                setModalOpen(true);
            })
            .catch(error => {
                if(error.response.status === 422) {
                    setWrongPassword(true);
                }
            });
    }

    const onchange = (event) => {
        setUser({
            ...user,
            [event.target.id] : event.target.value
        })
    }

    const onchangeAddress = (event) => {
        setUser({
            ...user,
            address: {
                ...user.address,
                [event.target.id] : event.target.value
            }
        })
    }

    const onChangePassword = (event) => {
        setUserPassword({
            ...userPassword,
            [event.target.id] : event.target.value
        })
    }

    return (
        <div className="user-page-main">
            <h3 className="user-page-header">Сторінка користувача</h3>
            <div className="user-page-container">
                <div className="user-page-general box">

                    <div hidden={!activeInput} className="user-page-icon" onClick={() => setActiveInput(false)}>
                        <img src={editIcon} alt="edit icon"/>
                    </div>
                    <div hidden={activeInput} className="user-page-icon" onClick={saveUser}>
                        <img src={saveIcon} alt="edit icon"/>
                    </div>

                    <div className="user-page-row">
                        <label>Ім'я:</label>
                        <input id="firstName" disabled={activeInput} type="text" value={user.firstName} onChange={onchange}/>
                    </div>

                    <div className="user-page-row">
                        <label>Прізвище:</label>
                        <input id="lastName" disabled={activeInput} type="text" value={user.lastName} onChange={onchange}/>
                    </div>

                    <div className="user-page-row">
                        <label>Номер телефону:</label>
                        <input id="phoneNumber" disabled={activeInput} type="text" value={user.phoneNumber} onChange={onchange}/>
                    </div>

                    <div className="user-page-row">
                        <label>Електронна пошта:</label>
                        <input id="email" disabled={activeInput} type="text" value={user.email} onChange={onchange}/>
                    </div>
                    <div className="line"/>
                    <h4 className="user-page-header">Зміна паролю</h4>
                    <div className="user-page-row">
                        <lable>Старий пароль</lable>
                        <input id="oldPassword" onChange={onChangePassword} type="password" autoComplete="new-password" value={userPassword.oldPassword}/>
                    </div>
                    <div className="user-page-row">
                        <lable>Новий пароль</lable>
                        <input id="newPassword" onChange={onChangePassword} type="password" value={userPassword.newPassword}/>
                    </div>
                    <div className="user-page-row">
                        <lable>Повторіть пароль</lable>
                        <input id="confirmPassword" onChange={onChangePassword} type="password" value={userPassword.confirmPassword}/>
                    </div>

                    <p hidden={userPassword.newPassword === userPassword.confirmPassword} className="error">Паролі не збігаються</p>
                    <p hidden={!wrongPassword} className="error">Невірний пароль</p>

                    <button disabled={userPassword.newPassword !== userPassword.confirmPassword} className="user-page-reset-password-button" onClick={resetPassword}>Скинути пароль</button>
                </div>

                <div className="user-page-address box">
                    <h4 className="user-page-header" style={{marginBottom: 70 + 'px'}}>Адреса</h4>

                    <div className="user-page-row">
                        <label>Країна:</label>
                        <input id="land" type="text" value={user.address.land} onChange={onchangeAddress}/>
                    </div>

                    <div className="user-page-row">
                        <label>Місто:</label>
                        <input id="city" type="text" value={user.address.city} onChange={onchangeAddress}/>
                    </div>

                    <div className="user-page-row">
                        <label>Вулиця:</label>
                        <input id="street" type="text" value={user.address.street} onChange={onchangeAddress}/>
                    </div>

                    <div className="user-page-row">
                        <label>Будинок:</label>
                        <input id="homeNumber" type="text" value={user.address.homeNumber} onChange={onchangeAddress}/>
                    </div>

                    <div className="user-page-row">
                        <label>Поштовий код:</label>
                        <input id="postCode" type="text" value={user.address.postCode} onChange={onchangeAddress}/>
                    </div>

                    <button className="user-page-save-address-button" onClick={saveAddress}>Зберегти</button>
                </div>
            </div>

            <SuccessModal text={successText} open={modalOpen} setOpen={setModalOpen}/>
        </div>
    )
}

export default UserPage;
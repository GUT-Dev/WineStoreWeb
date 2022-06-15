import "./UserPage.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import editIcon from "../../resources/icons/edit_icon.png"
import saveIcon from "../../resources/icons/save_icon.png"
import SuccessModal from "../../modals/SuccessModal/SuccessModal";
import {useForm} from "react-hook-form";

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
    const [wrongPassword, setWrongPassword] = useState(false);
    const [activeInput, setActiveInput] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [successText, setSuccessText] = useState(null);

    useEffect(() => {
        getUser();
    }, [])

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

    const prepareDataAfterSave = async (jwtToken) => {
        await setActiveInput(true);
        dispatch({type: "LOGIN", payload: jwtToken});
        await getUser();
        await setSuccessText("Успішно");
        await setModalOpen(true);
    }

    const GeneralBlock = () => {
        const { register, handleSubmit, formState: { errors, isValid } } = useForm({
            mode: "onChange"
        });

        const onSubmit = async (data) => {
            const sendData = {
                id: user.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: defaultAddress
            }
            await axios.put(USER_PATH, sendData, {headers: {Authorization: 'Bearer ' + jwtToken}})
                .then(r => {
                    prepareDataAfterSave(r.data)
                });
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div hidden={!activeInput} className="user-page-icon" onClick={() => setActiveInput(false)}>
                    <img src={editIcon} alt="edit icon"/>
                </div>
                <div hidden={activeInput || !isValid} className="user-page-icon">
                    <img src={saveIcon} alt="save icon"/>
                </div>
                <input type="submit" hidden={activeInput} className="user-page-icon-submit" value="" disabled={!isValid}/>

                <div className="user-page-row">
                    <label>Ім'я:</label>
                    <input disabled={activeInput}
                           type="text"
                           maxLength={30}
                           {...register("firstName", {
                               value: user.firstName,
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 3,
                                   message: "*Ім'я повинне бути від 3 символів"
                               },
                               pattern: {
                                   value: /^[А-Яа-я&A-Za-z]+$/,
                                   message: "*Ім'я повинне містити тільки літери"
                               }
                           })}
                    />
                    {errors?.firstName &&
                    <span className="user-page-validation-error error">{errors.firstName?.message || "Помилка"}</span>}

                </div>

                <div className="user-page-row">
                    <label>Прізвище:</label>
                    <input disabled={activeInput}
                           maxLength={30}
                           {...register("lastName", {
                               value: user.lastName,
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 3,
                                   message: "*Прізвище повинне бути від 3 символів"
                               },
                               pattern: {
                                   value: /^[А-Яа-я&A-Za-z]+$/,
                                   message: "*Прізвище повинне містити тільки літери"
                               }
                           })}
                    />
                    {errors?.lastName && <span className="user-page-validation-error error">{errors.lastName?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <label>Номер телефону:</label>
                    <input disabled={activeInput}
                           type="text"
                           maxLength={16}
                           {...register("phoneNumber", {
                               value: user.phoneNumber,
                               required: "*Поле обов'язкове для заповнення",
                               pattern: {
                                   value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                   message: "*Невірний формат"
                               }
                           })}
                    />
                    {errors?.phoneNumber && <span className="user-page-validation-error error">{errors.phoneNumber?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <label>Електронна пошта:</label>
                    <input disabled={activeInput}
                           type="text"
                           maxLength={30}
                           {...register("email", {
                               value: user.email,
                               required: "*Поле обов'язкове для заповнення",
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                   message: "*Електронна пошта не валідна"
                               }
                           })}
                    />
                    {errors?.email && <span className="user-page-validation-error error">{errors.email?.message || "Помилка"}</span>}
                </div>
            </form>
        );
    }

    const PasswordBlock = () => {
        const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
            mode: "onChange"
        });

        const onSubmit = async (data) => {
            setWrongPassword(false);
            await axios.put(RESET_PASSWORD_PATH, data, {headers: {Authorization: 'Bearer ' + jwtToken}})
                .then(() => {
                    setSuccessText("Пароль успішно змінено")
                    setModalOpen(true);
                })
                .catch(error => {
                    if(error.response.status === 422) {
                        setWrongPassword(true);
                    }
                });
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="user-page-header">Зміна паролю</h4>

                <div className="user-page-row">
                    <lable>Старий пароль</lable>
                    <input type="password"
                           autoComplete="new-password"
                           maxLength={25}
                           {...register("oldPassword", {
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 8,
                                   message: "Мінімальна довжина пароля 8 символів"
                               }
                           })}
                    />
                    {errors?.oldPassword && <span className="user-page-validation-error error">{errors?.oldPassword?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <lable>Новий пароль</lable>
                    <input type="password"
                           maxLength={25}
                           {...register("newPassword", {
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 8,
                                   message: "Мінімальна довжина пароля 8 символів"
                               }
                           })}
                    />
                    {errors?.newPassword && <span className="user-page-validation-error error">{errors?.newPassword?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <lable>Повторіть пароль</lable>
                    <input type="password"
                           maxLength={25}
                           {...register("confirmPassword", {
                               required: "*Повторіть пароль",
                               validate: (value) => value === watch('newPassword')
                           })}
                    />
                    {errors?.confirmPassword && <span className="user-page-validation-error error">{errors?.comparePassword?.message || "*Паролі не співпадають"}</span>}
                </div>

                <p hidden={!wrongPassword} className="error">Невірний пароль</p>

                <input type="submit" disabled={!isValid} className="user-page-reset-password-button user-page-save-button" value="Скинути пароль" />
            </form>
        );
    }

    const AddressBlock = () => {
        const { register, handleSubmit, formState: { errors, isValid } } = useForm({
            mode: "onChange"
        });

        const onSubmit = async (data) => {
            await axios.post(ADDRESS_PATH, data, {headers: {Authorization: 'Bearer ' + jwtToken}})
                .then(r => {
                    setUser({...user, address: r.data});
                    setSuccessText("Адресу успішно оновлено");
                    setModalOpen(true);
                })
        }

        return (
            <form className="user-page-address box" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="user-page-header" style={{marginBottom: 70 + 'px'}}>Адреса</h4>

                <div className="user-page-row">
                    <label>Країна:</label>
                    <input type="text"
                           maxLength={16}
                           {...register("land", {
                               value: user.address.land,
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 3,
                                   message: "*Мінімальна довжина поля 3 літери"
                               },
                               pattern: {
                                   value: /^[А-Яа-я&A-Za-z]+$/,
                                   message: "*Поле повинне містити тільки літери"
                               }
                           })}
                    />
                    {errors?.land && <span className="user-page-validation-error error">{errors.land?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <label>Місто:</label>
                    <input type="text"
                           maxLength={16}
                           {...register("city", {
                               value: user.address.city,
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 3,
                                   message: "*Мінімальна довжина поля 3 літери"
                               },
                               pattern: {
                                   value: /^[А-Яа-я&A-Za-z]+$/,
                                   message: "*Поле повинне містити тільки літери"
                               }
                           })}
                    />
                    {errors?.city && <span className="user-page-validation-error error">{errors.city?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <label>Вулиця:</label>
                    <input type="text"
                           maxLength={16}
                           {...register("street", {
                               value: user.address.street,
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 3,
                                   message: "*Мінімальна довжина поля 3 літери"
                               },
                               pattern: {
                                   value: /^[А-Яа-я&A-Za-z]+$/,
                                   message: "*Поле повинне містити тільки літери"
                               }
                           })}
                    />
                    {errors?.street && <span className="user-page-validation-error error">{errors.street?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <label>Будинок:</label>
                    <input type="text"
                           maxLength={16}
                           {...register("homeNumber", {
                               value: user.address.homeNumber,
                               required: "*Поле обов'язкове для заповнення"
                           })}
                    />
                    {errors?.homeNumber && <span className="user-page-validation-error error">{errors.homeNumber?.message || "Помилка"}</span>}
                </div>

                <div className="user-page-row">
                    <label>Поштовий код:</label>
                    <input type="text"
                           maxLength={6}
                           {...register("postCode", {
                               value: user.address.postCode,
                               minLength: {
                                   value: 4,
                                   message: "*Мінімальна довжина поля 4 цифри"
                               },
                               pattern: {
                                   value: /^[0-9]+$/,
                                   message: "*Поле повинне містити тільки цифри"
                               }
                           })}
                    />
                    {errors?.postCode && <span className="user-page-validation-error error">{errors.postCode?.message || "Помилка"}</span>}
                </div>

                <input type="submit" className="user-page-save-address-button user-page-save-button" value="Зберегти" disabled={!isValid}/>
            </form>
        );
    }

    return (
        <div className="user-page-main">
            <h3 className="user-page-header">Сторінка користувача</h3>
            <div className="user-page-container">
                <div className="user-page-general box">
                    <GeneralBlock />
                    <div className="line"/>
                    <PasswordBlock />
                </div>
                <AddressBlock />
            </div>
            <SuccessModal text={successText} open={modalOpen} setOpen={setModalOpen}/>
        </div>
    )
}

export default UserPage;
import './RegistrationForm.css';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

const BASE_PATH = "http://localhost:8080"
const REGISTRATION_PATH = BASE_PATH + "/registration"
const PRINCIPAL_PATH = BASE_PATH + "/principal"

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    });
    const [apiError, setApiError] = useState(null);

    const onSubmit = async (data) => {
        await axios.post(REGISTRATION_PATH, {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password
            }
        ).then(res => {
                dispatch({type: "LOGIN", payload: res.data});
                reset();
                getUser(res.data);
            }
        ).catch(err => setApiError(err.response));
    }

    const getUser = async (apiKey) => {
        await axios.get(PRINCIPAL_PATH, {headers: {Authorization: 'Bearer ' + apiKey}})
            .then(res =>
                dispatch({type: "SET_USER", payload: res.data})
            )
        return navigate("/")
    }

    const checkErrors = () => {
        if (apiError) {
            return (<p className="error"> Error {apiError.message}</p>)
        }
    }

    return (
        <div className="reg-main">
            <h1 id="reg-header">Реєстрація:</h1>
            <form className="reg-form box" onSubmit={handleSubmit(onSubmit)}>

                <div className="reg-item">
                    <label>Ім'я</label>
                    <input type="text"
                           maxLength={30}
                           {...register("firstName", {
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
                    {errors?.name && <span className="reg-form-validation-error error">{errors.name?.message || "Помилка"}</span>}
                </div>

                <div className="reg-item">
                    <label>Прізвище</label>
                    <input type="text"
                           maxLength={30}
                           {...register("lastName", {
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
                    {errors?.lastName && <span className="reg-form-validation-error error">{errors.lastName?.message || "Помилка"}</span>}
                </div>

                <div className="reg-item">
                    <label>Електронна пошта</label>
                    <input type="text"
                           maxLength={32}
                           {...register("email", {
                               required: "*Поле обов'язкове для заповнення",
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                   message: "*Електронна пошта не валідна"
                               }
                           })}
                    />
                    {errors?.email && <span className="reg-form-validation-error error">{errors.email?.message || "Помилка"}</span>}
                </div>

                <div className="reg-item">
                    <label>Номер телефону</label>
                    <input type="text"
                           maxLength={16}
                           {...register("phoneNumber", {
                               required: "*Поле обов'язкове для заповнення",
                               pattern: {
                                   value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                   message: "*Невірний формат"
                               }
                           })}
                    />
                    {errors?.phoneNumber && <span className="reg-form-validation-error error">{errors.phoneNumber?.message || "Помилка"}</span>}
                </div>

                <div className="reg-item">
                    <label>Пароль</label>
                    <input type="password"
                           maxLength={25}
                           {...register("password", {
                               required: "*Поле обов'язкове для заповнення",
                               minLength: {
                                   value: 8,
                                   message: "Мінімальна довжина пароля 8 символів"
                               }
                           })}
                    />
                    {errors?.password && <span className="reg-form-validation-error error">{errors?.password?.message || "Помилка"}</span>}
                </div>

                <div className="reg-item">
                    <label>Повторіть пароль</label>
                    <input type="password"
                           maxLength={25}
                           {...register("confirmPassword", {
                               required: "*Повторіть пароль",
                               validate: (value) => value === watch('password')
                           })}
                    />
                    {errors?.confirmPassword && <span className="reg-form-validation-error error">{errors?.comparePassword?.message || "Паролі не співпадають"}</span>}
                </div>

                {checkErrors()}

                <input className="reg-form-submit" type="submit" value="Підтвердити" disabled={!isValid}/>
            </form>
        </div>
    );
}

export default RegistrationForm;
import './RegistrationForm.css';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";

const BASE_PATH = "http://localhost:8080"
const REGISTRATION_PATH = BASE_PATH + "/registration"
const PRINCIPAL_PATH = BASE_PATH + "/principal"

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [state, setState] = useState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            error: null,
            status: null,
        }
    )

    const handleChange = (event) => {
        setState({
                ...state,
                [event.target.id]: event.target.value
            }
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(REGISTRATION_PATH, {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                phoneNumber: state.phoneNumber,
                password: state.password
            }
        )
            .then(res => {
                dispatch({type: "LOGIN", payload: res.data});
                getUser(res.data);
            })
            .catch(err => setState({...state, error: err.response}));
    }

    const getUser = async (apiKey) => {
        await axios.get(PRINCIPAL_PATH, {headers: {Authorization: 'Bearer ' + apiKey}})
            .then(res =>
                dispatch({type: "SET_USER", payload: res.data})
            )
        return navigate("/")
    }

    const comparePassword = () => {
        if (state.password !== state.confirmPassword) {
            return (
                <div className="error">
                    <p>Паролі не співпадають</p>
                </div>
            )
        }
    }

    const checkErrors = () => {
        if (state.error) {
            return (<p className="error"> Error {state.error.message}</p>)
        }
    }

    return (
        <div className="reg-main">
            <h1 id="reg-header">Реєстрація:</h1>
            <form className="reg-form box">

                <div className="reg-item">
                    <label>Ім'я</label>
                    <input type="text" value={state.firstName} onChange={handleChange} id="firstName"/>
                </div>

                <div className="reg-item">
                    <label>Прізвище</label>
                    <input type="text" value={state.lastName} onChange={handleChange} id="lastName"/>
                </div>

                <div className="reg-item">
                    <label>Електронна пошта</label>
                    <input type="text" value={state.email} onChange={handleChange} id="email"/>
                </div>

                <div className="reg-item">
                    <label>Номер телефону</label>
                    <input type="text" value={state.phoneNumber} onChange={handleChange} id="phoneNumber"/>
                </div>

                <div className="reg-item">
                    <label>Пароль</label>
                    <input type="password" value={state.password} onChange={handleChange} id="password"/>
                </div>

                <div className="reg-item">
                    <label>Повторіть пароль</label>
                    <input type="password" value={state.confirmPassword} onChange={handleChange}
                           id="confirmPassword"/>
                    {comparePassword()}
                </div>

                {checkErrors()}

                <button onClick={handleSubmit}>Підтвердити</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
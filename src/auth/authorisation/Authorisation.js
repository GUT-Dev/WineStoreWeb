import './Authorisation.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router";

const BASE_PATH = "http://localhost:8080"
const AUTH_PATH = BASE_PATH + "/auth"
const PRINCIPAL_PATH = BASE_PATH + "/principal"

const Authorisation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [error, setError] = useState(null)
    let [loginValues, setLoginValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setLoginValues(value => {
            return {
                ...value,
                [event.target.id]: event.target.value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        login().finally()
    }

    const login = async () => {
        await axios.post(AUTH_PATH, loginValues)
            .then(res => {
                    dispatch({type: "LOGIN", payload: res.data})
                    getUser(res.data)
                }
            )
            .catch(err => {
                switch (err.response.data.errorCode) {
                    case 1 :
                        setError("Пароль не вірний");
                        break;
                    case 2 :
                        setError("Користувач з даною електронною поштою не знайдений")
                        break;
                    case 3 :
                        setError("Користувач заблокований")
                        break;
                    case 4 :
                        setError("Користувач забанений по причині: " +
                            err.response.data.message.substring(err.response.data.message.indexOf(": ")))
                }
            })
    }

    const getUser = async (apiKey) => {
        await axios.get(PRINCIPAL_PATH, {headers: {Authorization: 'Bearer ' + apiKey}})
            .then(res =>
                dispatch({type: "SET_USER", payload: res.data})
            )
        return navigate("/")
    }

    const showErrors = () => {
        if (error != null) {
            return (<h3 className="error">{error}</h3>)
        }
    }

    return (
        <div className="auth-main">
            <h1 id="auth-header">Авторизація</h1>
            <form className="auth-form">
                <div>
                    <label>Електронна пошта</label>
                    <input type="text" id="email" value={loginValues.email} onChange={handleChange}/>
                </div>

                <div>
                    <label>Пароль</label>
                    <input type="password" id="password" value={loginValues.password} onChange={handleChange}/>
                </div>

                {showErrors()}

                <button onClick={handleSubmit}>Підтвердити</button>
            </form>
        </div>
    )
}

export default Authorisation;
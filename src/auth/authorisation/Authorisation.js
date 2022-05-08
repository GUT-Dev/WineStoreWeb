import './Authorisation.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const AUTH_PATH = BASE_PATH + "/auth"
const PRINCIPAL_PATH = BASE_PATH + "/principal"

const Authorisation = () => {
    const dispatch = useDispatch()
    const authDetails = useSelector(state => state)
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        //
        // await axios.post(AUTH_PATH, loginValues)
        //     .then(res =>
        //         dispatch({type: "LOGIN", payload: res.data})
        //     )
        // console.log(authDetails)

        axios.get(PRINCIPAL_PATH, {headers: {Authorization: 'Bearer ' + authDetails.jwtToken}})
            .then(res =>
                dispatch({type:"SET_USER", payload: res.data})
            )
        console.log(authDetails)
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

                <button onClick={handleSubmit}>Підтвердити</button>
            </form>
        </div>
    )
}

export default Authorisation;
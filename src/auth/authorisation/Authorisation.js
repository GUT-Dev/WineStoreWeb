import './Authorisation.css';
import {Component} from "react";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/auth"

export default class Authorisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log("send")
        event.preventDefault()
        axios.post(ELEMENT_PATH, {
            email: this.state.email,
            password: this.state.password
        }).then(res => this.state.status = res.status)
    }

    render() {
        return (
            <div className="auth-main">
                <h1 id="auth-header">Авторизація</h1>
                <form className="auth-form">
                    <div>
                        <label>Електронна пошта</label>
                        <input type="text" id="email"/>
                    </div>

                    <div>
                        <label>Пароль</label>
                        <input type="password" id="password"/>
                    </div>

                    <button type="submit">Підтвердити</button>
                </form>
            </div>
        )
    }
}
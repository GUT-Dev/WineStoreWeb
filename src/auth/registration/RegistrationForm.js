import './RegistrationForm.css';
import {Component} from "react";
import axios from "axios";
import {Navigate} from "react-router";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/registration"

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            error: null,
            status: null,
            response: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        axios.post(ELEMENT_PATH, {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    password: this.state.password
            }).then(res => this.state.status = res.status)
    }

    comparePassword() {
        if(this.state.password !== this.state.confirmPassword) {
            return (
                <div className="error">
                    <p>Паролі не співпадають</p>
                </div>
            )
        }
    }

    render() {
        const {error, status} = this.state;
        if (error) {
            return (<p> Error {error.message}</p>)
        } else if (status === 200) {
            return (
                <div>
                    <h1>Реєстрація успішна</h1>
                    <p>{this.state.response}</p>
                    <Navigate  to="/" />
                </div>
            );
        }
        else {
            return (
                <div className="reg-main">
                    <div>{this.state.response}</div>
                    <h1 id="reg-header">Реєстрація:</h1>
                    <form className="reg-form">

                        <div className="reg-item">
                            <label>Ім'я</label>
                            <input type="text" value={this.state.firstName} onChange={this.handleChange} id="firstName"/>
                        </div>

                        <div className="reg-item">
                            <label>Прізвище</label>
                            <input type="text" value={this.state.lastName} onChange={this.handleChange} id="lastName"/>
                        </div>

                        <div className="reg-item">
                            <label>Електронна пошта</label>
                            <input type="text" value={this.state.email} onChange={this.handleChange} id="email"/>
                        </div>

                        <div className="reg-item">
                            <label>Номер телефону</label>
                            <input type="text" value={this.state.phoneNumber} onChange={this.handleChange} id="phoneNumber"/>
                        </div>

                        <div className="reg-item">
                            <label>Пароль</label>
                            <input type="password" value={this.state.password} onChange={this.handleChange} id="password"/>
                        </div>

                        <div className="reg-item">
                            <label>Повторіть пароль</label>
                            <input type="password" value={this.state.confirmPassword} onChange={this.handleChange} id="confirmPassword"/>
                            {this.comparePassword()}
                        </div>

                        <button type="submit" onClick={this.handleSubmit}>Підтвердити</button>
                    </form>
                </div>
            );
        }
    }
}
import React, { Component } from "react";
import is from 'is_js';
import axios from 'axios';

import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from '../../components/UI/Input/Input';


// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный Email',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный Пароль',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        const FIREBASE_AUTH = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
        const API_KEY = 'AIzaSyB8hCAytWwhvZ9qr4I6v5CA2ZD1sFt6A74';

        const AUTH_DATA = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        axios.post(FIREBASE_AUTH+API_KEY, AUTH_DATA)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    registerHandler = () => {
        const FIREBASE_AUTH = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
        const API_KEY = 'AIzaSyB8hCAytWwhvZ9qr4I6v5CA2ZD1sFt6A74';

        const AUTH_DATA = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        axios.post(FIREBASE_AUTH+API_KEY, AUTH_DATA)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    submitHandler = (event) => {
        event.preventDefault();
    }
    

    validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid; // not mandatory in first IF :)
        }

        if (validation.email) {
            // isValid = validateEmail(value) && isValid;
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        // console.log(`${controlName}: `, event.target.value)
        
        const formControls = { ...this.state.formControls};
        const control = { ...formControls[controlName] }

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        // form validation
        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })


        this.setState({
            formControls: formControls,
            isFormValid: isFormValid
        })

        
    }

  render() {

    const inputs = Object.keys(this.state.formControls)
        .map ( (controlName, index)=> {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    valid={control.valid}
                    touched={control.touched}
                    errorMessage={control.errorMessage} 
                    shouldValidate={!!control.validation} 
                    onChange={event => this.onChangeHandler(event, controlName)}/>
            )
        } )


    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                {inputs}
            <Button 
                btnType="success" 
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
                >
              Войти
            </Button>
            <Button btnType="primary" onClick={this.registerHandler}>
                Регистрация
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

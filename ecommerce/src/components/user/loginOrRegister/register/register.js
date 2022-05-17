import React from 'react';
import { registerUser } from '../../../../api';
import Error from '../../../propmts/error/error';
import './register.css';
const { Component } = React;

class Register extends Component {
    state = {
        showError: false,
        gotError: true,
        message: '',
    }

    user = {
        userName: '',
        email: '',
        password: '',
        repeatePassword: '',
    }

    getRegisterData = (event) => {
        switch (event.target.name) {
            case 'userName':
                this.user.userName = event.target.value;
                break;
            case 'email':
                this.user.email = event.target.value;
                break;
            case 'password':
                this.user.password = event.target.value;
                break;
            case 'repeatePassword':
                this.user.repeatePassword = event.target.value;
                break;
            default:
                break;
        }
    }

    validateInput = (btn) => {
        if (!this.user.userName) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please enter an username!'
            });
            return;
        }
        if (!this.user.email) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please enter an email!'
            });
            return;
        }
        if (!this.user.password) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please enter an password!'
            });
            return;
        }
        if (!this.user.repeatePassword) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please repeate the password!'
            });
            return;
        }
        if (this.user.repeatePassword !== this.user.password) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Passwords don\'t match!',
            });
            return;
        }
        this.setState({
            gotError: false,
            showError: false,
            message: 'No error to show!'
        });
        this.signUpUser(btn);
    }

    serverErrorHandler = (err) => {
        err.then(err => {
            if (err.errmsg) {
                if (err.errmsg.includes('userName')) {
                    this.setState({
                        gotError: true,
                        showError: true,
                        message: 'The username is already registered!'
                    })
                }
                if (err.errmsg.includes('email')) {
                    this.setState({
                        gotError: true,
                        showError: true,
                        message: 'The e-mail is already registered!'
                    })
                };
            }
        })
    }

    signUpUser = (btn) => {
        let serForRegistration = {
            "userName": this.user.userName,
            "password": this.user.password,
            "email": this.user.email,
            "isAdmin": true,
        }
        registerUser(serForRegistration)
            .then((res) => {
                res.ok ? this.resetUser(btn) : this.serverErrorHandler(res.json());
            })
    }

    resetUser = (btn) => {
        const repeatePassword = btn.previousElementSibling;
        const password = repeatePassword.previousElementSibling;
        const email = password.previousElementSibling;
        const userName = email.previousElementSibling;
        userName.value = '';
        email.value = '';
        password.value = '';
        repeatePassword.value = '';
        this.user.userName = '';
        this.user.email = '';
        this.user.password = '';
        this.user.repeatePassword = '';
    }

    submit = (event) => {
        event.preventDefault();
        const btn = event.target;
        this.validateInput(btn);
    }

    render() {
        return <div className="col-sm-4">
            <div className="signup-form">
                <form>
                    <Error showError={this.state.showError} message={this.state.message} title='Register:' />
                    <input type="text" onChange={this.getRegisterData} autoComplete="on" name="userName" placeholder="Name" />
                    <input type="email" onChange={this.getRegisterData} autoComplete="on" name="email" placeholder="Email Address" />
                    <input type="password" onChange={this.getRegisterData} autoComplete="off" name="password" placeholder="Password" />
                    <input type="password" onChange={this.getRegisterData} autoComplete="off" name="repeatePassword" placeholder="Repeate password" />
                    <button onClick={this.submit} className="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
    }
}

export default Register;
import React from "react";
import loginImg from "../../login.svg"
import axios from 'axios';
import { Redirect } from "react-router";

import baseURL from "../../config/config";

const loginURL = baseURL + "/login"

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
        }
    }

    state = {
        email: '',
        password: ''
      }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(loginURL, user)
        .then(res => {
            console.log(res.data.jwt);
            if (res.data.jwt) {
                localStorage.setItem("Auth", res.data.jwt);
                this.setState({isAuth: true});
            }
        })
        .catch(err => { console.log(err) })
    }

    render() {
        const { isAuth } = this.state;

        return <div className="base-container" ref={this.props.containerRef}>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="img"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="ceres.team15@gmail.com" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="******" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={this.handleSubmit}>Login</button>
                { isAuth && <Redirect to="/home" /> }
            </div>
        </div>
    }
}

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { getAllUser,login,createUser } from './userfunctions';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            passwordError: '',
            emailError: '',
            loggedIn:false
        }
    }

    
    componentDidMount(){
        return axios.get('http://localhost:9080/api/getAllUsers').then((res)=>{
            console.debug("res",res.data)
            return res.data;
        }).catch((err)=>{
            console.debug("error",err);
        })
    }

    handleChange = event => {
        if(event.target.name === 'password'){
            this.validatePassword();
        }else if(event.target.name === 'email'){
            this.validateEmail();
        }
        // console.debug("event.target.name",event.target.name);
        this.setState({[event.target.name]: event.target.value});
    }

    validatePassword = () => {
        const { password } = this.state;
        this.setState({
            passwordError:
                password.length > 3 ? null : 'Password must be longer than 3 characters'
        });

        if(password.length){
            return true;
        }else{
            return false;
        }
    }

    validateEmail = () => {
        const { email } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
            this.setState({ email: email });
            this.setState({ emailError:'Invalid Email'});
            return false;
        }
        else {
            this.setState({ email: email })
            console.log("Email is Correct");
            this.setState({ emailError:null});
            return true;
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.debug(this.state);
        if(this.validateEmail() && this.validatePassword()){
            console.debug("---------> valid form");
            console.debug(this.state);
            const user = {
                email:this.state.email,
                password:this.state.password
            }

            login(user).then((data)=> {
                console.debug("data",data); 
                if(data.email){
                    let loggedIn = true;
                    this.setState({loggedIn:loggedIn})
                }
                console.debug("state",this.state); 
              

            }).catch((err) =>{
                console.debug("Error in log in",err);
            })
        }
    };

    
    render() {
        if(this.state.loggedIn){
            return <Redirect to="/dashboard"></Redirect>
        }
        return (
            <div className="lpanel">
                <h5 className="text_center">Login </h5>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" ref="email"
                            name="email"
                            className={`common_text form-control  ${this.state.emailError ? 'common_text is-invalid' : ''}`}
                            id="email"
                            value={this.state.email}
                            onChange={ this.handleChange }
                            onBlur={this.validateEmail}
                            placeholder="Enter email" />
                        <div className='invalid-feedback'>{this.state.emailError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" ref="password"
                            className={`common_text form-control ${this.state.passwordError ? 'common_text is-invalid' : ''}`}
                            id="password" name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            onBlur={this.validatePassword}
                            placeholder="Password" />
                        <div className='invalid-feedback'>{this.state.passwordError}</div>
                    </div>
                    <div className="btn_holder">
                    <button type="submit" className="common_btn btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}



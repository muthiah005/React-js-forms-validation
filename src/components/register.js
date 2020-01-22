import React, { Component } from 'react';
import { getAllUser,login,createUser } from './userfunctions';

export default class Register extends Component    {

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            confirmPassword:'',
            firstNameError:'',
            lastNameError:'',
            emailError: '',
            passwordError: '',
            confirmPasswordError:''
        }
    }

    handleChange = event => {
        if(event.target.name === 'firstName'){
            this.validateFirstName();
        }
        else if(event.target.name === 'lastName'){
            this.validateLastName();
        }
        else if(event.target.name === 'email') {
            this.validateEmail();
        }
        else if(event.target.name === 'password') {
            this.validatePassword();
        }
        else if(event.target.name === 'confirmPassword') {
            this.validateConfirmPassword();
        }
        this.setState({[event.target.name]: event.target.value});
    }

    validateFirstName = () => {
        const { firstName } = this.state;
        this.setState({
            firstNameError:
            firstName.length > 3 ? null : 'Name must be longer than 3 characters'
        });

        if(firstName.length){
            return true;
        }else{
            return false;
        }
    }

    validateLastName = () => {
        const { lastName } = this.state;
        this.setState({
            lastNameError:
            lastName.length > 1 ? null : 'Name must be longer than 1 characters'
        });

        if(lastName.length){
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


    validateConfirmPassword = () => {
        const { password,confirmPassword } = this.state;
        if(confirmPassword.length < 3){
            this.setState({
                confirmPasswordError:'Confirm password must be longer than 3 characters'
            });
            return false;
        } 
        else if(password !== confirmPassword){
            this.setState({
                confirmPasswordError:'Confirm password and password should match'
            }); 
            return false;
        }else{
            console.debug(password,confirmPassword);
            this.setState({ confirmPassword: confirmPassword });
            this.setState({
                confirmPasswordError:null
            }); 
            return true;
        }
    }



    handleSubmit = event => {
        event.preventDefault();
        if( this.validateFirstName() && this.validateLastName() && this.validateEmail() && this.validatePassword() && this.validateConfirmPassword() ){ 
            console.debug("---------> API CALL ---> valid form call api here");
            console.debug(this.state);

            const newUser = {
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                password:this.state.password,
            }

            createUser(newUser).then((data)=> {
                console.debug("data",data); 
                // isLoggedIn();
            }).catch((err) =>{
                console.debug("Error in log in",err);
            })

        }
    };



    render()    {
        const style ={marginLeft:'10px'}
        return(
           <div className="lpanel">
            <h5 className="text_center">Register</h5>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input type="text" 
                className={`common_text form-control  ${this.state.FirstNameError ? 'common_text is-invalid' : ''}`}
                id="name" name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange }
                onBlur={this.validateFirstName}
                placeholder="Enter First Name"/>
                <div className='invalid-feedback'>{this.state.FirstNameError}</div>
            </div>

            <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input type="text" 
                className={`common_text form-control  ${this.state.lastNameError ? 'common_text is-invalid' : ''}`}
                id="name" name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange }
                onBlur={this.validateLastName}
                placeholder="Enter Last Name"/>
                <div className='invalid-feedback'>{this.state.lastNameError}</div>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" name="email"
                 className={`common_text form-control  ${this.state.emailError ? 'common_text is-invalid' : ''}`}
                 id="email"
                 value={this.state.email}
                 onChange={this.handleChange}
                 onBlur={this.validateEmail}
                 placeholder="Enter email"/>
                 <div className='invalid-feedback'>{this.state.emailError}</div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"
                className={`common_text form-control ${this.state.passwordError ? 'common_text is-invalid' : ''}`}
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.validatePassword} 
                placeholder="Password"/>
                <div className='invalid-feedback'>{this.state.passwordError}</div>
            </div>
            <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" name="confirmPassword"
                className={`common_text form-control ${this.state.confirmPasswordError ? 'common_text is-invalid' : ''}`}
                id="confirmpassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange }
                onBlur={this.validateConfirmPassword}
                placeholder="Confirm password"/>
                <div className='invalid-feedback'>{this.state.confirmPasswordError}</div>
            </div>
            <div className="btn_holder">
            <button type="submit" className="common_btn btn btn-primary">Submit</button>
            <button type="submit" className="common_btn btn btn-warning" style={style}>Cancel</button>
            </div>
            </form>
            </div>
        )
    }
}
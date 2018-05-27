import React, { Component } from 'react';
import './Register.css';
import { Redirect } from "react-router-dom";
import axios from 'axios'
class Register extends Component{
    constructor() {
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            isValid: '', notif: '', notifDisplay: "none", notifPos: "absolute", notifLeft: "-10000px"
        };
    }


    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3300/register', 
        { 
            inputEmail: this.refs.inputEmail.value, 
            inputPassword: this.refs.inputPassword.value,
            inputName: this.refs.inputName.value
        })
        .then(function(response){
            console.log(response)
            if (response.data.message==="Success"){
                this.setState({
                    isValid: true
                })
            }
            else {
                this.setState({
                    isValid: false,
                    notifDisplay: "show",
                    notifPos: "relative",
                    notifLeft: "0",
                    notif: 'Email yang sama sudah terdaftar!'
                })
            }
        })
        .catch((err) => {console.log(err);})
      }


    render() {
        if (this.state.isValid) {
            return <Redirect to='./login' />
          }
        return(
        <div id='divRegister'>
            <form className="form-signin" id="Registerform" onSubmit={this.handleSubmit}>
                <h2 className="form-signin-heading">Register</h2>
                <p>E-mail  : <input type="email" id="email" ref="inputEmail" className="form-control" placeholder="Email" required autoFocus /></p>
                <p>Username: <input type="text" id="username" ref="inputName" className="form-control" placeholder="Username" required autoFocus /></p>
                <p>Password: <input type="password" id="password" ref="inputPassword" className="form-control" placeholder="Password" required autoFocus /></p>
                <p><button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Register</button></p>
            </form>
        </div>

        );
    }
}
export default Register;
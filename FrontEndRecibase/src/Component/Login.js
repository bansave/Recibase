import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Login extends Component{
    constructor(){
        super();
        this.state={username:'', password:'', userdata:[]}
      }

    componentWillMount(){
        axios.get(`http://localhost:3300/login/all`)
    .then((getdata) => {
      this.setState({userdata: getdata.data});
    console.log('ini getdata',this.state.userdata)
    
    
    })
        console.log('ini isinya state',this.state)
    }
    onUsernameInput= () =>{
        this.setState({username: this.refs.username.value})
    }
    onPasswordInput= () =>{
        this.setState({password: this.refs.password.value})
    }
    onclicklogin = () =>{
        this.state.userdata.map((item,index)=>{
            console.log('ini item map',item)
            console.log(this.state.username)
            console.log(item.user_name)
            console.log(item.user_password)
        if(this.state.username!=item.user_name && this.state.password!=item.user_password)
        {
            // this.props.userlogin({Username: '', Password: ''})                        
        }
        else if(this.state.username==item.user_name && this.state.password==item.user_password)
        {
            console.log("success")
            this.props.userlogin({Username: this.state.username, Password: this.state.password, Id: item.user_ID})
        }
        })
    }

    render() {
        return(
        <div className='container' id='divlogin'>
            <form id="loginform">
                <p>Username: <input type="text" ref="username" onInput={this.onUsernameInput}/></p>
                <p>Password: <input type="password" ref="password" onInput={this.onPasswordInput}/></p>
                <p><Link to="/" className="nav-link"><input type='button' id='login' onClick={()=>{this.onclicklogin()}} value='Login'/></Link></p>
            </form>
        </div>

        );
    }
}



export default connect(null, { userlogin })(Login);


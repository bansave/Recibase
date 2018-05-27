import React, { Component } from 'react';
import './HeadNaviLogin.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import { selectID } from '../actions';
import {Search} from '../actions'

class HeadNaviLogin extends Component{
  constructor(){
    super();
    this.state = {Text:''};
  }
  textSearch(){
    this.setState({Text: this.refs.searchinput.value})
  }

  OnclickSearch= () =>{
    // console.log('ini click search',this.state.Text);
    this.props.Search({search: this.state.Text})
  }

  onclickLogout = () =>{
    this.props.userlogin({Username: '', Password: ''});
  }

  onclickhome=()=>{
    this.props.selectID({selectID: 0, page: ''});
  }
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: '#af442a'}}>
      <div className="container">
        <img src={require('../img/logo.png')} alt="" style={{width:50, height:50}}/>
        <Link to="/" className="navbar-brand" onClick={()=>{this.onclickhome()}}>ReciBase</Link>
        <span className="input-group-btn"><input type="text" className="form-control" placeholder="Search for..." className="searchbar" ref='searchinput' onChange={()=>{this.textSearch()}}/>
                
                <Link to='/Search'><button className="btn btn-danger" type="button" onClick={()=>{this.OnclickSearch()}}>Go!</button></Link>
                </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
          <span className="nav-link active">Welcome, {this.props.username}</span>
          
            <li className="nav-item">
              <Link to="/addrecipe" className="nav-link"><span>|</span><span>Add New Recipe!</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-link"><span>|</span>DashBoard
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={()=>{this.onclickLogout()}}><span>|</span>Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        );
    }
}

const mapStateToProps = (state) => {
  return {username:state.login.Username};
};

export default connect(mapStateToProps,{userlogin, selectID, Search})(HeadNaviLogin);
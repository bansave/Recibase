import React, { Component } from 'react';
import './HeadNavi.css';
import { Link } from 'react-router-dom'
import HeadNaviLogin from './HeadNaviLogin.js'
import { connect } from 'react-redux';
import {Search} from '../actions'
import {selectID} from '../actions'
class HeadNavi extends Component{
  constructor(){
    super();
    this.state = {Text:''};
  }

  textSearch(){
    this.setState({Text: this.refs.searchinput.value})
  }

  OnclickSearch= () =>{
    console.log('ini click search',this.state.Text);
    this.props.Search({search: this.state.Text})
  }

  onclickhome=()=>{
    this.props.selectID({selectID: 0, page: ''});
  }

    render() {
      if(this.props.Username!=='' && this.props.Password!==''){return (<HeadNaviLogin/>)}
        return(
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: '#af442a'}}>
      <div className="container">
        <img alt="" src={require('../img/logo.png')} style={{width:50, height:50}}/>
        <Link to="/" className="navbar-brand" onClick={()=>{this.onclickhome()}}>ReciBase</Link>
        <span className="input-group-btn"><input type="text" className="form-control" placeholder="Search for..." className="searchbar" ref='searchinput' onChange={()=>{this.textSearch()}}/>
                
                  <Link to='/Search'><button className="btn btn-danger" type="button" onClick={()=>{this.OnclickSearch()}}>Go!</button></Link>
                </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/login" className="nav-link">Login
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </div>
      </div>  
    </nav>
        );
    }
}

const mapStateToProps = (state) => {
  return { Username: state.login.Username, Password: state.login.Password };
};

export default connect(mapStateToProps,{Search, selectID})(HeadNavi);
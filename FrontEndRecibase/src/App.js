import React, { Component } from 'react';
import './App.css';
import HeadNavi from './Component/HeadNavi';
import HeadNaviLogin from './Component/HeadNaviLogin';
import BodyHome from './Component/BodyHome';
import Login from './Component/Login';
import Register from './Component/Register';
import RecipeInput from './Component/RecipeInput';
import Search from './Component/Search.js';
import Dashboard from './Component/DashBoard';
import { Route } from 'react-router-dom'
import {Switch} from 'react-router';
import DashBoard from './Component/DashBoard';

// import BodyHome from './Component/BodyHome';

class App extends Component {
  render() {
    
    // const HeadChanger = ()=>{
    //   if(this.props.Username!=='' && this.props.Password!=''){
    //     return(<HeadNaviLogin/>)
    //   }
    //   else
    //   {
    //     return(<HeadNavi/>)
    //   }
    // }
    return (

      <div className="App">
      <HeadNavi/>
      <Switch> 
        <Route exact path="/" component={BodyHome}/> 
        <Route path="/login" component={Login}/> 
        <Route path="/register" component={Register}/>
        <Route path="/addrecipe" component={RecipeInput}/>
        <Route path="/Search" component={Search}/>
        <Route path="/Dashboard" component={DashBoard}/>
      </Switch>
    </div>
    );
  }
}



export default App;

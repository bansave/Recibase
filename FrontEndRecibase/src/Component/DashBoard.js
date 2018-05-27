import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DashboardData from './DashboardData'
import {selectID} from '../actions'
import EditRecipe from './EditRecipe'
import { Redirect } from "react-router-dom";

class DashBoard extends Component{
    constructor(){
        super();
        this.state = {RecipeList:[]};
      }
      onclickDetail=(id)=>{
        this.props.selectID({selectID: id, page: 'Edit'});
    }

    onclickDelete=(id)=>{
        axios.post(`http://localhost:3300/delete/${parseInt(id)}`)
        .catch((err)=>{console.log(err);})
        return <Redirect to='./' />
        
    }
      componentDidMount(){
        axios.get(`http://localhost:3300/dashboard/${this.props.id}`)
        .then((getdata) => {
          console.log('ini dashboard props',this.props.id);            
          console.log('ini dashboard getdata', getdata);            
          this.setState({RecipeList: getdata.data});
          console.log('ini dashboard',this.state.RecipeList);
        })
      }
    render() {
        const bodydata = this.state.RecipeList.map((item, index)=>{
            var RecipeName = item.recipe_name
            var RecipeVisit = item.resep_visit
            var RecipeType = item.type_of_dish
            var RecipeID = item.recipe_Id
            console.log(RecipeName);
            return(
              <DashboardData key={index} RecipeName={RecipeName} RecipeVisit={RecipeVisit} RecipeType={RecipeType} recipeid={RecipeID} onclickDetail={this.onclickDetail} onclickDelete={this.onclickDelete}/>
            );
          })
          if(this.props.view === 'Edit') return <div><EditRecipe id={this.props.selectedID}/></div>
        return(
        <div className="row">      
            
            
            {bodydata}
          
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.login)
    return { id : state.login.Id, selectedID: state.IDselector.ID, view: state.IDselector.Page};
  };
  
export default connect(mapStateToProps,{selectID})(DashBoard);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {selectID} from '../actions'
import AdminData from './AdminData'
class Admin extends Component{
    constructor(){
        super();
        this.state = {RecipeList:[]};
      }
    
      componentWillMount(){
        axios.get(`http://localhost:3300/user`)
        .then((getdata) => {
          this.setState({RecipeList: getdata.data});
        })
      }

    render() {
        const bodydata = this.state.RecipeList.map((item, index)=>{
            var UserName = item.user_name
            console.log(RecipeName);
            return(
              <AdminData key={index} name={UserName}/>
            );
          })
        return(
        <div className="row">      
            
            
            {bodydata}
          
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { search : state.Search.SearchText, selectedID: state.IDselector.ID, view: state.IDselector.Page };
  };
  
export default connect(mapStateToProps,{selectID})(Admin);
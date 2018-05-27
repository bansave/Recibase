import React, { Component } from 'react';
import SearchData from './SearchData'
import { connect } from 'react-redux';
import axios from 'axios';
import {selectID} from '../actions'
import Detail from './Detail'
class Search extends Component{
    constructor(){
        super();
        this.state = {link:'', RecipeList:[], isValid: false};
      }
    
      componentWillMount(){
        axios.get(`http://localhost:3300/data/${this.props.search}`)
        .then((getdata) => {
          this.setState({RecipeList: getdata.data});
        })
        this.setState({isValid: true})
      }

      componentWillUpdate(){
        if(this.state.isValid===true)
        {
          this.setState({isValid: false},()=>{
            this.setState({link: this.props.search})
          })
        }
      }


      onclickDetail=(id)=>{
        this.props.selectID({selectID: id, page: 'Detail'});
    }

    render() {
        const bodydata = this.state.RecipeList.map((item, index)=>{
            var RecipeName = item.recipe_name
            var RecipeVisit = item.resep_visit
            var RecipeType = item.type_of_dish
            var RecipeID = item.recipe_Id
            console.log(RecipeName);
            return(
              <SearchData key={index} RecipeName={RecipeName} RecipeVisit={RecipeVisit} RecipeType={RecipeType} recipeid={RecipeID} onclickDetail={this.onclickDetail} validation = 'true'/>
            );
          })
          if(this.props.view == 'Detail') return <div><Detail id={this.props.selectedID}/></div>
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
  
export default connect(mapStateToProps,{selectID})(Search);
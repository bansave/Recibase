
import React, { Component } from 'react';
import Detail from './Detail.js'
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './BodyHome.css'
import axios from 'axios';
import BodyHomeData from './BodyHomeData'
import { selectID } from '../actions';
import { DetailItem } from '../actions';
import { connect } from 'react-redux';

class BodyHome extends Component{
  constructor(){
    super();
    this.state = {link:'', RecipeList:[], RecipeList2:{}, checker:0};
  }


  componentWillMount(){
    axios.get(`http://localhost:3300/data`)
    .then((getdata) => {
      this.setState({RecipeList: getdata.data});
    })
  }

  componentWillUpdate(){
    if(this.state.checker===1){
    axios.get(`http://localhost:3300/data`)
    .then((getdata) => {
      this.setState({RecipeList: getdata.data});
    this.props.selectID({selectID: 0, page: ''});
    this.setState({checker: 0});
      
    })
    }
  }

  
  onclickDetail=(id, visit)=>{
    axios.post(`http://localhost:3300/visit`, {
      recipe_Id: id,
      recipevisit: parseInt(visit)+1
    }).catch((err)=> {console.log(err);})
    this.setState({link:`hmm`})
    console.log(this.state.link)
    this.setState({checker: 1});
    this.props.selectID({selectID: id, page: 'Detail'});
}

      render() {
        const bodydata = this.state.RecipeList.map((item, index)=>{
          var RecipeName = item.recipe_name
          var RecipeVisit = item.resep_visit
          var RecipeType = item.type_of_dish
          var RecipeID = item.recipe_Id
          var UserName = item.user_name
          console.log(RecipeName);
          return(
            <BodyHomeData key={index} RecipeName={RecipeName} RecipeVisit={RecipeVisit} RecipeType={RecipeType} recipeid={RecipeID} onclickDetail={this.onclickDetail} name={UserName}/>
          );
        }) 
        if(this.props.view == 'Detail') return <div><Detail id={this.props.selectedID}/></div>
        return (
          <div className="container" id='bodyhomeid'>
            <Carousel autoPlay interval={3000} infiniteLoop dynamicHeight>
                <div>
                    <img src='https://www.kawalingpinoy.com/wp-content/uploads/2017/10/nasi-goreng-1.jpg' />
                    <p className="legend">Nasi Goreng 1</p>
                </div>
                <div>
                    <img src={require('../img/nasigoreng.png')} />
                    <p className="legend">Nasi Goreng 2</p>
                </div>
                <div>
                    <img src={require('../img/nasigoreng.png')} />
                    <p className="legend">Nasi Goreng 3</p>
                </div>
            </Carousel> 
            <hr/>
            <h2>Recent Recipe</h2>
            <hr/>
            <div className="row">      
            
            
              {bodydata}
            
            </div>
          </div>          
        );
    }
}

const mapStateToProps = (state) => {
  console.log('ini mapstateto',state)
  return { selectedID: state.IDselector.ID, view: state.IDselector.Page };
};

export default connect(mapStateToProps , {selectID, DetailItem})(BodyHome);
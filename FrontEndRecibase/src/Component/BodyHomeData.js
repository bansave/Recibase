import React, { Component } from 'react';
import './HeadNavi.css';
import { Link } from 'react-router-dom'

class BodyHomeData extends Component{
    
    render() {
        return(
            <div className="col-lg-3 col-md-4 mb-3">
                <div className="card h-100">
                    <a onClick={()=>this.props.onclickDetail(this.props.recipeid, this.props.RecipeVisit)}><img className="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                    <div className="card-body">
                    <h4 className="card-title">
                        <a href="#">{this.props.RecipeName}</a>
                    </h4>
                    <h5>{this.props.RecipeType}</h5>  
                    </div>
                    <div className="card-footer">
                    <small className="text-muted"><img src={require('../img/smile.png')} style={{width:23, height:23}} /> {this.props.RecipeVisit} {this.props.name}</small>
                    </div>
                </div>
            </div>
        );
    }
}
export default BodyHomeData;







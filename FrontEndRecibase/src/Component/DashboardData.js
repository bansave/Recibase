import React, { Component } from 'react';
class DashboardData extends Component{
    render() {
        return(
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <a href="#" onClick={()=>this.props.onclickDetail(this.props.recipeid)}><img className="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                <div className="card-body">
                <h4 className="card-title">
                    <a href="#">{this.props.RecipeName}</a>
                </h4>
                <h5>{this.props.RecipeType}</h5>  
                </div>
                <div className="card-footer">
                <small className="text-muted"><img src={require('../img/smile.png')} style={{width:23, height:23}} /> {this.props.RecipeVisit} <input type="button" onClick={()=>this.props.onclickDelete(this.props.recipeid)}  value='delete'/></small>
                </div>
            </div>
        </div>
        );
    }
}
export default DashboardData;
import React, { Component } from 'react';
import { connect } from 'react-redux';
class Search extends Component{
    render() {
        return(
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                <div className="card-body">
                <h4 className="card-title">
                    <a href="#">{this.props.name}</a>
                </h4>  
                </div>
            </div>
        </div>
        );
    }
}
export default Search;
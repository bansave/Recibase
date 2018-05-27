import React, { Component } from 'react';
class DetailAlat extends Component{
    render() {
        return(
        <div id='divDetailAlat'>
            <li>{this.props.nama}</li>
        </div>

        );
    }
}
export default DetailAlat;
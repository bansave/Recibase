import React, { Component } from 'react';
class DetailBumbu extends Component{
    render() {
        return(
        <div id='divDetailBumbu'>
            <li>{this.props.nama} {this.props.jumlah} {this.props.satuan}</li>
        </div>

        );
    }
}
export default DetailBumbu;
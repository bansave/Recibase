import React, { Component } from 'react';
class DetailBahan extends Component{
    render() {
        return(
        <div id='divDetailBahan'>
            <li>{this.props.nama} {this.props.jumlah} {this.props.satuan}</li>
        </div>

        );
    }
}
export default DetailBahan;
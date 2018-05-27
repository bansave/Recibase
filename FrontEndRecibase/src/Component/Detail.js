import React, { Component } from 'react';
import { selectID } from '../actions';
import { DetailItem } from '../actions'
import { connect } from 'react-redux';
import DetailBahan from './DetailBahan';
import DetailBumbu from './DetailBumbu';
import DetailAlat from './DetailAlat';
import axios from 'axios';

class Detail extends Component{
  constructor(){
    super();
    this.state = {idresep:0, RecipeList:[], RecipeList2:{}};
  }

  componentWillMount(){
    axios.get(`http://localhost:3300/data/details/${this.props.selectedID}`)
    .then((getdata) => {
      this.setState({...this.state,RecipeList2: getdata.data});
      // console.log('axios get bodyhome',this.state.RecipeList2)
      // console.log('propid', this.props.selectedID)
      // console.log('namaresep', this.state.RecipeList2.resep[0][0].recipe_name)
      this.props.DetailItem({namaresep: this.state.RecipeList2.resep[0][0].recipe_name, bahan: this.state.RecipeList2.resep[2] , bumbu: this.state.RecipeList2.resep[3], alat: this.state.RecipeList2.resep[1], step: this.state.RecipeList2.resep[0][0].recipe_steps})
      
    })
  }

  onclickback=(id)=>{
    this.props.selectID({selectID: 0, page: ''});
}

    render() {
      const bahan = this.props.bahan.map((item, index) =>{
        return(<DetailBahan key={index} nama={item.nama} jumlah={item.jumlah} satuan={item.satuan}/>)
      })

      const bumbu = this.props.bumbu.map((item, index) =>{
        return(<DetailBumbu key={index} nama={item.nama} jumlah={item.jumlah} satuan={item.satuan}/>)
      })

      const alat = this.props.alat.map((item, index) =>{
        return(<DetailAlat key={index} nama={item.nama}/>)
      })
      // const data = this.state.RecipeList.map((item, index)=>{
      //   var RecipeName = item.recipe_name
      //   var bahan = [item.nama_bahan]
      // });
        // console.log(RecipeName);
        // return(
        //   <BodyHomeData key={index} RecipeName={RecipeName} RecipeVisit={RecipeVisit} RecipeType={RecipeType} recipeid={RecipeID} onclickDetail={this.onclickDetail}/>
        // );
        // if(this.state.view == 'BodyHome') return <div><BodyHome/></div>
        return(
        // <!-- Page Content -->
    <div className="container">

      {/* <!-- Portfolio Item Heading --> */}
      <h1 className="my-4"><span value='<'></span>{this.props.namaresep}
      </h1>

      {/* <!-- Portfolio Item Row --> */}
      <div className="row">

        <div className="col-md-3">
          <img className="img-fluid" src="http://placehold.it/200x200" alt=""/>
        </div>

        <div className="col-md-2">
          <h3 className="my-3">Bahan</h3>
          <ul>
            {bahan}
          </ul> 
        </div>
        
        <div className="col-md-2">
        <h3 className="my-3">Bumbu</h3>
          <ul>
            {bumbu}
          </ul>
        </div>

        <div className="col-md-2">
          <h3 className="my-3">Alat</h3>
          <ul>
            {alat}
          </ul>
        </div>
        

      </div>
      <h3 className="my-3">Cara Membuat</h3>
          <textarea style={{width:700}} value={this.props.step} readOnly></textarea>
      </div>

        );
    }
}

const mapStateToProps = (state) => {
  console.log('ini mapstateto',state)
  return { namaresep: state.DataDetail.namaresep, bahan: state.DataDetail.bahan, bumbu: state.DataDetail.bumbu,alat: state.DataDetail.alat, step: state.DataDetail.step , selectedID: state.IDselector.ID};
};

export default connect(mapStateToProps, {selectID, DetailItem})(Detail);
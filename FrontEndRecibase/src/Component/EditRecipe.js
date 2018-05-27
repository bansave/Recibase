import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BodyHome from './BodyHome';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { DetailItem } from '../actions'
import axios from 'axios'
class EditRecipe extends Component {
  constructor() {
    super();
    this.state = {
      view: 'asd', arrbahan: [], arrbahanId: [], objbahan: { nama: '', jumlah: 0, satuan: '', resep_Id: 0 },
      objbumbu: { nama: '', jumlah: 0, satuan: '', resep_Id: 0, bumbu_Id: 0 },
      bahancounter: 0, arrbumbu: [], bumbucounter: 0, arralat: [],
      isValid: '', resepid: 0, reseplength: [], objalat: { nama: '', resep_Id: 0 }, alatcounter: 0
    };
  }

  componentWillMount() {
    axios.get(`http://localhost:3300/data/details/${this.props.selectedID}`)
      .then((getdata) => {
        this.setState({ ...this.state, RecipeList2: getdata.data });
        // console.log('axios get bodyhome',this.state.RecipeList2)
        // console.log('propid', this.props.selectedID)
        // console.log('namaresep', this.state.RecipeList2.resep[0][0].recipe_name)
        this.props.DetailItem({
          namaresep: this.state.RecipeList2.resep[0][0].recipe_name,
          bahan: this.state.RecipeList2.resep[2], bumbu: this.state.RecipeList2.resep[3],
          alat: this.state.RecipeList2.resep[1], step: this.state.RecipeList2.resep[0][0].recipe_steps,
          tipe: this.state.RecipeList2.resep[0][0].type_of_dish
        })

      })
  }



  componentWillUpdate() {
    if (this.state.isValid === true) {
      this.setState({ isValid: false })
    }
  }

  bahansubmit = (key) => {
    let objbahan = { ...this.state.objbahan };
    objbahan.bahan_Id = this.props.bahan[key].bahan_Id;
    objbahan.nama = this.refs.namabahan.value;
    objbahan.jumlah = parseInt(this.refs.jumlahbahan.value);
    objbahan.satuan = this.refs.satuanbahan.value;
    objbahan.resep_Id = this.props.selectedID;

    this.setState({ objbahan }, () => {
      let arrbahan = this.props.bahan

      console.log('ini let arrbahan', arrbahan)
      arrbahan[key] = this.state.objbahan;
      console.log('ini let arrbahan2', arrbahan)
      console.log('ini state arrbahanId', this.state.arrbahanId)
      console.log('ini props bahan', this.props.bahan)
      console.log(this.state.objbahan)
      this.setState({ isValid: true })
    });
    // this.setState({ bahancounter: 1 })

    // if (this.state.bahancounter === 1) {
    //   let arrbahan = this.props.bahan
    //   console.log('ini let arrbahan', arrbahan)
    //   arrbahan[key] = this.state.objbahan;
    //   console.log('ini let arrbahan2', arrbahan)
    //   console.log('ini props bahan', this.props.bahan)
    //   console.log('ini arrbahan state', this.state.arrbahan)
    //   console.log(this.state.objbahan)
    //   this.setState({ bahancounter: 0 })

    // }


  }

  bumbusubmit = () => {
    let objbumbu = { ...this.state.objbumbu };
    objbumbu.nama = this.refs.namabumbu.value;
    objbumbu.jumlah = this.refs.jumlahbumbu.value;
    objbumbu.satuan = this.refs.satuanbumbu.value;
    objbumbu.resep_Id = this.state.resepid;
    this.setState({ objbumbu });
    console.log(this.state.obj)
    this.setState({ bumbucounter: 1 })
    if (this.state.bumbucounter === 1) {
      this.setState({ arrbumbu: [...this.state.arrbumbu, this.state.obj] })
      console.log(this.state.arrbumbu)
      this.setState({ bumbucounter: 0 })

    }

  }

  alatsubmit = () => {
    let objalat = { ...this.state.objalat };
    objalat.nama = this.refs.namaalat.value;
    objalat.resep_Id = this.state.resepid;
    this.setState({ objalat });
    this.setState({ alatcounter: 1 })
    if (this.state.alatcounter === 1) {
      this.setState({ arralat: [...this.state.arralat, this.state.objalat] })
      console.log('ini arr alat', this.state.arralat)
      this.setState({ alatcounter: 0 })

    }
    //   this.setState({ arralat: [...this.state.arralat, this.refs.namaalat.value] })
    // console.log(this.state.arralat) 
    // console.log(...this.state.arralat) 


  }

  handleSubmit = (event) => {
    console.log('ini bahan', this.state.arrbahan)
    console.log('ini bumbu', this.state.arrbumbu)
    console.log('ini alat', this.state.arralat)
    axios.post(`http://localhost:3300/update/${this.props.selectedID}`,
      {
        inputNamaResep: this.refs.recipename.value,
        inputbahan: this.props.bahan,
        inputbumbu: this.state.arrbumbu,
        inputalat: this.state.arralat,
        inputstep: this.refs.step.value,
        inputjenis: this.refs.jenishidangan.value,
        inputuser: this.props.id
      })

      .catch((err) => { console.log(err); })
    return <Redirect to='./' />
  }

  render() {
    const bahan = this.props.bahan.map((item, index) => {
      return (
        <li key={index}>{item.nama} {item.jumlah} {item.satuan}
          <input type="button" value="submit" onClick={() => { this.bahansubmit(index) }} /></li>

      )
    })

    const bumbu = this.props.bumbu.map((item, index) => {

      return (<li key={index}>Nama: {item.nama}<input type='text' ref='namabumbu' defaultValue={item.nama} />
        jumlah: {item.jumlah}<input type='number' ref='jumlahbumbu' defaultValue={item.jumlah} />
        satuan: {item.satuan}<input type='text' ref='satuanbumbu' defaultValue={item.satuan} />
        <input type="button" value="submit" onClick={() => { this.bumbusubmit(index) }} /></li>)
    })

    const alat = this.props.alat.map((item, index) => {
      return (
        <li key={index}>Nama: {item.nama}<input type='text' ref='namaalat' defaultValue={item.nama} />
          <input type="button" value="submit" onClick={() => { this.alatsubmit() }} />
        </li>)
    })
    return (
      // <!-- Page Content -->
      <div className="container">
        <form id="Recipeform" onSubmit={() => this.handleSubmit()}>
          {/* <!-- Portfolio Item Heading --> */}
          <h1 className="my-4">Nama Resep ({this.props.namaresep})<input type='text' className="form-control" id="recipe" ref="recipename" defaultValue={this.props.namaresep} />
          </h1>

          {/* <!-- Portfolio Item Row --> */}
          <div className="row">

            <div className="col-md-3">
              <p>Gambar Makanan <input type='file' /></p>
            </div>

            <div className="col-md-5">
              <h3 className="my-5">Bahan</h3>
              <ul>
                {bahan}
                <li><input type='text' ref='namabahan' />
                  <input type='number' ref='jumlahbahan' />
                  <input type='text' ref='satuanbahan' /></li>
              </ul>

              <h3 className="my-5">Bumbu</h3>
              <ul>
                {bumbu}

              </ul>

              <h3 className="my-5">Alat</h3>
              <ul>
                {alat}

              </ul>
              <h3 className="my-5">Jenis Hidangan</h3> {this.props.tipe}<input type='text' ref='jenishidangan' defaultValue={this.props.tipe} />

            </div>


          </div>
          <h3 className="my-3">Cara Membuat</h3>
          <textarea style={{ width: 700 }} ref='step' defaultValue={this.props.step}></textarea>
          <p><input type="submit" className="btn btn-lg btn-primary btn-block mt-2" value="Enter Recipe!" /></p>
        </form>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return { tipe: state.DataDetail.tipe, namaresep: state.DataDetail.namaresep, bahan: state.DataDetail.bahan, bumbu: state.DataDetail.bumbu, alat: state.DataDetail.alat, step: state.DataDetail.step, selectedID: state.IDselector.ID };
};

export default connect(mapStateToProps, { DetailItem })(EditRecipe);
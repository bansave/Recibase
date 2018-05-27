import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BodyHome from './BodyHome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
class RecipeInput extends Component {
  constructor() {
    super();
    this.state = {
      view: 'asd', arrbahan: [], obj: { nama: '', jumlah: 0, satuan: '', resep_Id: 0 },
      bahancounter: 0, arrbumbu: [], bumbucounter: 0, arralat: [],
      isValid: false, resepid: 0, reseplength: [], objalat: { nama: '', resep_Id: 0 }, alatcounter: 0
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3300/data/all')
      .then((getdata) => {
        this.setState({ reseplength: getdata.data });
        var length = this.state.reseplength.length + 1
        this.setState({ resepid: length })
      })
  }

  componentWillUpdate() {
    if (this.state.isValid === true) {
      this.setState({ isValid: false })
      // console.log(this.state.arrbahan) 

    }
  }

  bahansubmit = () => {
    console.log('ini resep id', this.state.resepid)
    let obj = { ...this.state.obj };
    obj.nama = this.refs.namabahan.value;
    obj.jumlah = parseInt(this.refs.jumlahbahan.value);
    obj.satuan = this.refs.satuanbahan.value;
    obj.resep_Id = this.state.resepid;
    this.setState({ obj }, () => {
      console.log(this.state.obj)

      this.setState({ arrbahan: [...this.state.arrbahan, this.state.obj] })
      this.setState({ isValid: true })
    });




  }

  bumbusubmit = () => {
    let obj = { ...this.state.obj };
    obj.nama = this.refs.namabumbu.value;
    obj.jumlah = this.refs.jumlahbumbu.value;
    obj.satuan = this.refs.satuanbumbu.value;
    obj.resep_Id = this.state.resepid;
    this.setState({ obj }, () => {
      this.setState({ arrbumbu: [...this.state.arrbumbu, this.state.obj] })
      // console.log(this.state.arrbumbu) 
      this.setState({ isValid: true })
    });
    console.log(this.state.obj)


  }

  alatsubmit = () => {
    let objalat = { ...this.state.objalat };
    objalat.nama = this.refs.namaalat.value;
    objalat.resep_Id = this.state.resepid;
    this.setState({ objalat }, () => {
      this.setState({ arralat: [...this.state.arralat, this.state.objalat] })
      // console.log('ini arr alat',this.state.arralat)  
      this.setState({ isValid: true })
    });

    //   this.setState({ arralat: [...this.state.arralat, this.refs.namaalat.value] })
    // console.log(this.state.arralat) 
    // console.log(...this.state.arralat) 


  }

  handleSubmit = (event) => {
    axios.post('http://localhost:3300/recipe',
      {
        inputNamaResep: this.refs.recipename.value,
        inputbahan: this.state.arrbahan,
        inputbumbu: this.state.arrbumbu,
        inputalat: this.state.arralat,
        inputstep: this.refs.step.value,
        inputvisit: 0,
        inputjenis: this.refs.jenishidangan.value,
        inputuser: this.props.id
      }).then(
        alert('New Recipe Was Added!')
      ).catch((err) => { console.log(err); })
  }

  render() {
    const bahanrepeat = this.state.arrbahan.map((item, index) => {
      return (
        <li key={index}><p>{item.nama} {item.jumlah} {item.satuan}</p></li>
      );
    });

    const bumburepeat = this.state.arrbumbu.map((item, index) => {
      return (
        <li key={index}><p>{item.nama} {item.jumlah} {item.satuan}</p></li>
      );
    });

    const alatrepeat = this.state.arralat.map((item, index) => {
      return (
        <li key={index}><p>{item.nama}</p></li>
      );
    });
    return (
      // <!-- Page Content -->
      <div className="container">
        <form id="Recipeform" onSubmit={this.handleSubmit}>
          {/* <!-- Portfolio Item Heading --> */}
          <h1 className="my-4">Nama Resep <input type='text' className="form-control" id="recipe" ref="recipename" />
          </h1>

          {/* <!-- Portfolio Item Row --> */}
          <div className="row">

            <div className="col-md-3">
              <p>Gambar Makanan <input type='file' /></p>
            </div>

            <div className="col-md-2">
              <h3 className="my-3">Bahan</h3>
              <ul>
                {bahanrepeat}
                <li>Nama: <input type='text' ref='namabahan' />
                  jumlah: <input type='number' ref='jumlahbahan' />
                  satuan: <input type='text' ref='satuanbahan' />
                  <input type="button" value="submit" onClick={() => { this.bahansubmit() }} /></li>
              </ul>

              <h3 className="my-3">Bumbu</h3>
              <ul>
                {bumburepeat}
                <li>Nama: <input type='text' ref='namabumbu' />
                  jumlah: <input type='number' ref='jumlahbumbu' />
                  satuan: <input type='text' ref='satuanbumbu' />
                  <input type="button" value="submit" onClick={() => { this.bumbusubmit() }} /></li>
              </ul>

              <h3 className="my-3">Alat</h3>
              <ul>
                {alatrepeat}
                <li>Nama: <input type='text' ref='namaalat' />
                  <input type="button" value="submit" onClick={() => { this.alatsubmit() }} />
                </li>
              </ul>
              <h3 className="my-3">Jenis Hidangan</h3> <input type='text' ref='jenishidangan' />

            </div>


          </div>
          <h3 className="my-3">Cara Membuat</h3>
          <textarea style={{ width: 700 }} ref='step'></textarea>
          <p><input type="submit" className="btn btn-lg btn-primary btn-block mt-2" value="Enter Recipe!" /></p>
        </form>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return { id: state.login.Id };
};

export default connect(mapStateToProps, null)(RecipeInput);
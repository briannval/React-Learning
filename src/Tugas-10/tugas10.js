import React from 'react';
import './tugas10.css';

//tablefunction
var i = 0
var dataHargaBuah = [
    {nama: "Semangka", harga: 10000, berat: 1000},
    {nama: "Anggur", harga: 40000, berat: 500},
    {nama: "Strawberry", harga: 30000, berat: 400},
    {nama: "Jeruk", harga: 30000, berat: 1000},
    {nama: "Mangga", harga: 30000, berat: 500}
  ]

for(i=0;i<5;i++){
    dataHargaBuah[i].berat = (dataHargaBuah[i].berat/1000)+" kg"
}

class Nama extends React.Component {
    render() {
      return <td id="table">{this.props.nama}</td>;
    }
  }

class Harga extends React.Component {
    render() {
      return <td id="table">{this.props.harga}</td>;
    }
  }

class Berat extends React.Component {
    render() {
      return <td id="table">{this.props.berat}</td>;
    }
  }

class Daftar extends React.Component {
    render() {
      return (
        <>
          <h1>Tabel Harga Buah</h1>
          <table>
            <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Berat</th>
            </tr>
          {dataHargaBuah.map(x=> {
            return (
              <tr>
                <Nama nama={x.nama}/> 
                <Harga harga={x.harga}/> 
                <Berat berat={x.berat}/>
              </tr>
            )
          })}
          </table>
        </>
      )
    }
  }

export default Daftar
import React, {Component} from 'react'

var daftarBuah = [
    {nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
    {nama: "Manggis", hargaTotal: 350000, beratTotal: 10000},
    {nama: "Nangka", hargaTotal: 90000, beratTotal: 2000},
    {nama: "Durian", hargaTotal: 400000, beratTotal: 5000},
    {nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000}
]

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
        daftarBuah,
        inputnama: "",inputharga: "", inputberat: "",curentIndex: -1}

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editButton = this.editButton.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
    
    }

    handleChange(event){
        this.setState({inputnama: event.target.value});
      }

    handleChange2(event){
        this.setState({inputharga: event.target.value});
      }

    handleChange3(event){
        this.setState({inputberat: event.target.value});
      }
    
    deleteButton(event){
       let index = parseInt(event.target.value);
       let daftarBaru = this.state.daftarBuah.filter((val,id) => {return id !== index})
       this.setState({
           daftarBuah: [...daftarBaru]
       })
    }

    editButton(event){
        let index = event.target.value;
        let nama = this.state.daftarBuah[index].nama
        let harga = this.state.daftarBuah[index].hargaTotal
        let berat = this.state.daftarBuah[index].beratTotal
        this.setState({
            inputnama: nama,
            inputharga: harga,
            inputberat: berat,
            currentIndex: index
        })
    }
    


    handleSubmit(event){
        event.preventDefault()
        let currentIndex = this.state.currentIndex;
        let daftarBuah = this.state.daftarBuah;
        let nama = this.state.inputnama;
        let harga = this.state.inputharga;
        let berat = this.state.inputberat;
        if (currentIndex === -1){
        this.setState({
          daftarBuah: [...daftarBuah, {nama: nama, hargaTotal: harga, beratTotal: berat}],
          inputnama: "",inputharga: "", inputberat: ""
        })
    }
    else{
        daftarBuah[currentIndex] = {nama: nama,hargaTotal: harga, beratTotal: berat}
        this.setState({
            daftarBuah: [...daftarBuah],
            inputnama: "",inputharga: "", inputberat: "",currentIndex: -1
        })
    }
      }

    render(){
        return(
            <>
            <h1>Daftar Peserta Lomba</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga total</th>
              <th>Berat total</th>
              <th>Harga per kg</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
              {
                this.state.daftarBuah.map((val, index)=>{
                  return(                    
                    <tr>
                      <td>{index+1}</td>
                      <td>{val.nama}</td>
                      <td>{val.hargaTotal}</td>
                      <td>{val.beratTotal/1000} kg</td>
                      <td>{val.hargaTotal/(val.beratTotal/1000)}</td>
                      <td><button onClick={this.editButton} value={index}>Edit</button><button onClick={this.deleteButton} value={index}>Delete</button></td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        <h1>Form Daftar Harga Buah</h1>
        <div className="FormBaru">
        <form onSubmit={this.handleSubmit}>
          <table>
              <tbody>
          <tr>
          <td><label>Nama: </label></td>       
          <td><input type="text" value={this.state.inputnama} onChange={this.handleChange}/></td>
          <br/>
          </tr>
          <tr>
          <td><label>Harga Total: </label></td>
          <td><input type="text" value={this.state.inputharga} onChange={this.handleChange2}/></td>
          <br/>
          </tr>
          <tr>
          <td><label>Berat Total (dalam gram): </label></td>
          <td><input type="text" value={this.state.inputberat} onChange={this.handleChange3}/></td>
          <br/>
          </tr>
          <tr>
          <td><button>submit</button></td>
          </tr>
          </tbody>
          </table>
        </form>
        </div>
            </>
        )
    }
}

export default Form
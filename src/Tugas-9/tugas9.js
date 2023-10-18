import React from 'react'

//inputfunction
class Input extends React.Component{
    render(){
        return (
            <div className="Form">
              <h1>Form Pembelian Buah</h1>
              <table>
                <tr height="25px">
                  <td>Nama Pelanggan</td>
                  <td><input></input></td>
                </tr>
                <tr>
                  <td>Daftar Item</td>
                  <td>
                  <form>
                    <input type="checkbox" id="1"></input>
                    <label for="1">Semangka</label><br></br>
                    <input type="checkbox" id="2"></input>
                    <label for="2">Jeruk</label><br></br>
                    <input type="checkbox" id="3"></input>
                    <label for="3">Nanas</label><br></br>
                    <input type="checkbox" id="4"></input>
                    <label for="4">Salak</label><br></br>
                    <input type="checkbox" id="5"></input>
                    <label for="5">Anggur</label><br></br>
                  </form>
                  </td>
                </tr>
                <button>Kirim</button>
              </table>
            </div>
          )
    }
}

export default Input
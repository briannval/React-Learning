import React, {useState,useContext, useEffect} from "react"
import axios from "axios"
import { useParams, BrowserRouter as Router,
  Switch,
  Route,
  Link } from "react-router-dom"

const MahasiswaForm = () => {
    const [Mahasiswa,setMahasiswa] = useState([])
    const [inputnama,setinputnama] = useState()
    const [inputmatakuliah,setinputmatakuliah] = useState()
    const [inputnilai,setinputnilai] = useState()
    let { currentId } = useParams()

    useEffect( () => {
      const fetchData = async ()=>{
        if (currentId != 0){
          const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${currentId}`)
          setinputnama(result.data.name)
          setinputmatakuliah(result.data.course)
          setinputnilai(result.data.score)
        }
      }
    fetchData()
    const fetchmahasiswa = async () => {
      const table = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores`)
      setMahasiswa(table.data.map(x=>{ return {Id: x.id, Nama: x.name, Mata_Kuliah: x.course, Nilai: x.score} }) )
      console.log({Mahasiswa})
    }
      
    fetchmahasiswa()
    }, [currentId])



    
  
    const handleChange = (event) =>{
      let inputValue = event.target.value
      setinputnama(inputValue)
    }
    
    const handleChange2 = (event) =>{
        let inputValue = event.target.value
        setinputmatakuliah(inputValue)
      }

    const handleChange3 = (event) =>{
        let inputValue = event.target.value
        setinputnilai(inputValue)
      }  

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (currentId == 0){
          axios.post(`http://backendexample.sanbercloud.com/api/student-scores`, {name: inputnama, course: inputmatakuliah, score: inputnilai})
        }else{
          axios.put(`http://backendexample.sanbercloud.com/api/student-scores/${currentId}`, {name: inputnama, course: inputmatakuliah, score: inputnilai})
  
        }
        setinputnama("")
        setinputmatakuliah("")
        setinputnilai()
        currentId = 0
      }

      return(
        <>
        <div>
        <h1>Form Nilai Mahasiswa</h1>
        <form onSubmit={handleSubmit}>
          <table>
              <tbody>
          <tr>
          <td><label>Nama: </label></td>       
          <td><input type="text" value={inputnama} onChange={handleChange}/></td>
          <br/>
          </tr>
          <tr>
          <td><label>Mata Kuliah: </label></td>
          <td><input type="text" value={inputmatakuliah} onChange={handleChange2}/></td>
          <br/>
          </tr>
          <tr>
          <td><label>Nilai: </label></td>
          <td><input type="number" min="0" max="100" value={inputnilai} onChange={handleChange3}/></td>
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

export default MahasiswaForm
import React, {useState,useContext, useEffect} from "react"
import { MahasiswaContext } from "./provider"
import axios from "axios"

const MahasiswaForm = () => {
    const [Mahasiswa,setMahasiswa,currentId,setcurrentId] = useContext(MahasiswaContext)
    const [inputnama,setinputnama] = useState()
    const [inputmatakuliah,setinputmatakuliah] = useState()
    const [inputnilai,setinputnilai] = useState()
   

    useEffect( () => {
      const fetchData = async ()=>{
        if (currentId !== null){
          const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${currentId}`)
          setinputnama(result.data.name)
          setinputmatakuliah(result.data.course)
          setinputnilai(result.data.score)
        }
      }
      fetchData()
  
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
        console.log(currentId)
        console.log(inputnama)
        console.log(inputmatakuliah)
        console.log(inputnilai)
        if (currentId === null){
          // untuk create data baru
          axios.post(`http://backendexample.sanbercloud.com/api/student-scores`, {name: inputnama, course: inputmatakuliah, score: inputnilai})
          .then(res => {
              let data = res.data
              setMahasiswa([...Mahasiswa, {Id: data.id, Nama: data.name, Mata_Kuliah: data.course, Nilai: data.score}])
          })
        }else{
          axios.put(`http://backendexample.sanbercloud.com/api/student-scores/${currentId}`, {name: inputnama, course: inputmatakuliah, score: inputnilai})
          .then(() => {
              let singleMahasiswa = Mahasiswa.find(el=> el.Id === currentId)
              singleMahasiswa.Nama= inputnama
              singleMahasiswa.Mata_Kuliah = inputmatakuliah
              singleMahasiswa.Nilai = inputnilai
              setMahasiswa([...Mahasiswa])
          })      
        }
        setinputnama("")
        setinputmatakuliah("")
        setinputnilai()
        setcurrentId(null)
      }


    return(
    <>
    <h1>Form Nilai Mahasiswa</h1>
    <div className="FormBaru">
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
import React, {useState, useEffect} from "react"
import axios from "axios"

var Mahasiswa = () => {
    const [Mahasiswa,setMahasiswa] = useState([])
    const [inputnama,setinputnama] = useState("")
    const [inputmatakuliah,setinputmatakuliah] = useState("")
    const [inputnilai,setinputnilai] = useState()
    const [currentId,setcurrentId] = useState(null)
    let i = 0
    useEffect( () => {
        const fetchData = async () => {
          const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores`)
    
          setMahasiswa(result.data.map(x=>{ return {Id: x.id, Nama: x.name, Mata_Kuliah: x.course, Nilai: x.score} }) )
        }
          
        fetchData()
      }, [])

    const indexing = (a) => {
        let nilai = a;
        if(nilai>=80){
            return "A"
        }
        else if(nilai>=70){
            return "B"
        }
        else if(nilai>=60){
            return "C"
        }
        else if(nilai>=50){
            return "D"
        }
        else if(nilai>=0){
            return "E"
        }
    }

    const deleteButton = (event) =>{
        let id = parseInt(event.target.value);
        axios.delete(`http://backendexample.sanbercloud.com/api/student-scores/${id}`)
        .then(() => {
          let newMahasiswa = Mahasiswa.filter(el=> {return el.Id !== id})
          setMahasiswa(newMahasiswa)
        })
     }
 
    const editButton = (event) => {
        let id = parseInt(event.target.value)
        axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${id}`)
        .then(res => {
          let data = res.data
          console.log(data)
          setinputnama(data.name)
          setinputmatakuliah(data.course)
          setinputnilai(data.score)
          setcurrentId(data.id)
        })
        
     }

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
        <h1>Daftar Nilai Mahasiswa</h1>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Mata Kuliah</th>
          <th>Nilai</th>
          <th>Index Nilai</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
          {
            Mahasiswa.map((val, index)=>{
              return(                    
                <tr>
                  <td>{index+1}</td>
                  <td>{val.Nama}</td>
                  <td>{val.Mata_Kuliah}</td>
                  <td>{val.Nilai}</td>
                  <td>{indexing(val.Nilai)}</td>
                  <td><button onClick={editButton} value={val.Id}>Edit</button><button onClick={deleteButton} value={val.Id}>Delete</button></td>
                </tr>
              )
            })
          }
      </tbody>
    </table>
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

export default Mahasiswa
import React, {useState,useContext, useEffect} from "react"
import { MahasiswaContext } from "./provider"
import axios from "axios"

const MahasiswaList = () => {
    const [Mahasiswa,setMahasiswa,currentId,setcurrentId] = useContext(MahasiswaContext)
    
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
        
        setcurrentId(id)
        
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
    </>
    )
}

export default MahasiswaList
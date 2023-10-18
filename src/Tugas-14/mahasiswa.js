import React from "react"
import { MahasiswaProvider } from "./provider"
import MahasiswaList from "./mahasiswalist"
import MahasiswaForm from "./mahasiswaform"

const Mahasiswa2 = () =>{
  return(
    <MahasiswaProvider>
      <MahasiswaList/>
      <MahasiswaForm/>
    </MahasiswaProvider>
  )
}

export default Mahasiswa2
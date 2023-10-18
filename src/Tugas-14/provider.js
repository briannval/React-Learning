import React, { useState, createContext } from "react";

export const MahasiswaContext = createContext();

export const MahasiswaProvider = props => {
  const [Mahasiswa, setMahasiswa] = useState([]);
  const [currentId,setcurrentId] = useState(null);

  return (
    <MahasiswaContext.Provider value={[Mahasiswa, setMahasiswa,currentId,setcurrentId]}>
      {props.children}
    </MahasiswaContext.Provider>
  );
};
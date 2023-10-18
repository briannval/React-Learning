import React, {useContext, useState} from "react";
import { Link,
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom"
import { useHistory } from "react-router";
import Input from '../Tugas-9/tugas9'
import Daftar from '../Tugas-10/tugas10'
import Countdown from '../Tugas-11/tugas11';
import Form from '../Tugas-12/tugas12';
import Mahasiswa from '../Tugas-13/tugas13';
import Mahasiswa2 from '../Tugas-14/mahasiswa';
import MahasiswaList from "./mahasiswalist";
import MahasiswaForm from "./mahasiswaform";
    
const RoutingDark = () => {
    const [style,setstyle] = useState("dark")
    const NavStyle = () => {
      if(style=="dark"){
        setstyle("light")
      }
      else if(style=="light"){
        setstyle("dark")
      }
    }
    return (
    <Router>
      <div>
        <nav className={style}>
          <ul>
            <li>
              <Link to="/tugas-9">Tugas-9</Link>
            </li>
            <li>
              <Link to="/tugas-10">Tugas-10</Link>
            </li>
            <li>
              <Link to="/tugas-11">Tugas-11</Link>
            </li>
            <li>
              <Link to="/tugas-12">Tugas-12</Link>
            </li>
            <li>
              <Link to="/tugas-13">Tugas-13</Link>
            </li>
            <li>
              <Link to="/tugas-14">Tugas-14</Link>
            </li>
            <li>
                <Link to="/">Tugas-15</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/tugas-9">
            <Input />
          </Route>
          <Route exact path="/tugas-10">
            <Daftar />
          </Route>
          <Route exact path="/tugas-11">
            <Countdown />
          </Route>
          <Route exact path="/tugas-12">
            <Form />
          </Route>
          <Route exact path="/tugas-13">
            <Mahasiswa />
          </Route>
          <Route exact path="/tugas-14">
            <Mahasiswa2 />
          </Route>
          <Route exact path="/">
            <div class="container">
            <button onClick={NavStyle}>Change navbar theme</button>
            </div>
             <MahasiswaList />
          </Route>
          <Route path="/tugas-15/create/:currentId">
          <div className="Formm">
            <MahasiswaForm />
            <br />
            <p className="Font"><Link to="/">Balik ke data mahasiswa</Link></p>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default RoutingDark
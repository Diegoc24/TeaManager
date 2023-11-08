import logo from './logo.svg';
import {Route, Routes} from "react-router-dom"
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/profile';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;

import { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/CreateAccount" element={<CreateAccount />} />
          <Route exact path="/Home" element={<Home/>}/>
          <Route exact path="/EmployeeList" element={<EmployeeList/>}/>
          <Route exact path="/CreateEmployee" element={<CreateEmployee/>}/>
          <Route exact path="/EditEmployee/:employeeId" element={<EditEmployee/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

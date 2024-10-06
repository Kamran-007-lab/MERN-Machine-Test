import { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
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
          {/* <Route exact path="/Login" element={<Login />} />
          <Route exact path="/CreateAccount" element={<CreateAccount />} />
          <Route exact path="/VerifyOtp" element={<Otp />} />
          <Route exact path="/HomePage" element={<HomePage/>}/>
          <Route exact path="/Wallet" element={<Wallet/>}/>
          <Route exact path="/AddCard" element={<AddCard/>}/>
          <Route exact path="/CreateCard" element={<CreateCard/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App

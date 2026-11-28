import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from 'react-router-dom'
import "./utils/ErrorInterceptor"

import {
  LoginPages
} from "./pages/LoginPages"
import {RegisterPages} from "./pages/RegisterPages"

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={
          <div>
            Hello Worlds
          </div>
        }/>

        <Route path='login' element={
          <LoginPages/>
        }/>
        <Route path='register' element={
          <RegisterPages/>
        }/>
      </Routes>
    </Router>
  )
}
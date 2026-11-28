import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from 'react-router-dom'


import {
  LoginPages
} from "./pages/LoginPages"

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
      </Routes>
    </Router>
  )
}
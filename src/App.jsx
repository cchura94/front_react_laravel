
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Inicio from './views/Inicio'
import Login from './views/Login'

function App() {
  
  return (
    <>
    <NavLink to="/">INICIO</NavLink> |
    <NavLink to="/login">INGRESAR</NavLink>
    <Routes>
      <Route path="/" element={<Inicio></Inicio>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Routes>

    
    </>
  )
}

export default App

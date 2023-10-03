
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Usuario from './views/admin/Usuario'

function App() {
  
  return (
    <>
    <NavLink to="/">INICIO</NavLink> |
    <NavLink to="/login">INGRESAR</NavLink> |
    <NavLink to="/usuario">USUARIOS</NavLink>
    
    <Routes>
      <Route path="/" element={<Inicio></Inicio>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/usuario" element={<Usuario></Usuario>}></Route>
    </Routes>

    
    </>
  )
}

export default App

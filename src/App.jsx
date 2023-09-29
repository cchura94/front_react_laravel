import { useState } from "react"
import authService from "./services/authService"


function App() {
  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")

  async function ingresar(){
    const credenciales = {
      email: correo,
      password: clave
    }
    try {
      
      const {data} = await authService.loginConLaravel(credenciales)
      console.log(data)

    } catch (error) {
      alert("Ocurrio un problema al autenticar")
      console.log(error)
    }
  }

  return (
    <>
    <h1>Login</h1>

    <label htmlFor="">Ingrese Correo</label>
    <input type="email" onChange={(e) => setCorreo(e.target.value)} />
    <br />
    <label htmlFor="">Ingrese Contraseña</label>
    <input type="password" onChange={(e) => setClave(e.target.value)} />
    <br />
    <button onClick={() => ingresar()}>INGRESAR</button>

    </>
  )
}

export default App

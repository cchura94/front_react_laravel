import { useState } from "react"
import authService from "./../services/authService"
import MessageService from "./../services/MessageService"

function Login() {

    const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")

  const [datosPerfil, setDatosPerfil] = useState({})

  async function ingresar(){
    const credenciales = {
      email: correo,
      password: clave
    }
    try {
      
      const {data} = await authService.loginConLaravel(credenciales)
      console.log(data)
      localStorage.setItem("access_token", data.access_token)

    } catch (error) {
      alert("Ocurrio un problema al autenticar")
      console.log(error)
    }
  }

  async function msg(){
    await MessageService.enviarMensajeTexto('hola');
  }

  async function getPerfil(){
    const {data} = await authService.getPerfil();
    setDatosPerfil(data)
  }


    return (<>
    <h1>Login</h1>

<label htmlFor="">Ingrese Correo</label>
<input type="email" onChange={(e) => setCorreo(e.target.value)} />
<br />
<label htmlFor="">Ingrese Contraseña</label>
<input type="password" onChange={(e) => setClave(e.target.value)} />
<br />
<button onClick={() => ingresar()}>INGRESAR</button>

<button onClick={() => msg()}>Enviar Mensaje Whatsapp</button>

<br />
<button onClick={() => getPerfil()}>Obtener Perfil</button>
<br />
{ JSON.stringify(datosPerfil) }
    </>)
}

export default Login;
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import authService from "./../services/authService"
import MessageService from "./../services/MessageService"

function Login() {

  const navigate = useNavigate()

  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")

  const [datosPerfil, setDatosPerfil] = useState({})

  async function ingresar() {
    const credenciales = {
      email: correo,
      password: clave
    }
    try {

      const { data } = await authService.loginConLaravel(credenciales)
      console.log(data)
      localStorage.setItem("access_token", data.access_token)

      navigate("/admin/categoria")

    } catch (error) {
      alert("Ocurrio un problema al autenticar")
      console.log(error)
    }
  }

  async function msg() {
    await MessageService.enviarMensajeTexto('hola');
  }

  async function getPerfil() {
    const { data } = await authService.getPerfil();
    setDatosPerfil(data)
  }


  return (<>
{  /*  
<h1>Login</h1>

    <label htmlFor="">Ingrese Correo</label>
    <input type="email" onChange={(e) => setCorreo(e.target.value)} />
    <br />
    <label htmlFor="">Ingrese Contraseña</label>
    <input type="password" onChange={(e) => setClave(e.target.value)} />
    <br />
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => ingresar()}>INGRESAR</button>

    <button onClick={() => msg()}>Enviar Mensaje Whatsapp</button>

    <br />
    <button onClick={() => getPerfil()}>Obtener Perfil</button>
    <br />
    {JSON.stringify(datosPerfil)}
*/
}
    
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      <div className="w-1/2 h-screen hidden lg:block">
        <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover w-full h-full" />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        
          <div className="mb-4">
            <label htmlFor="e" className="block text-gray-600">Ingrese Correo</label>
            <input type="text" id="e" name="username"  onChange={(e) => setCorreo(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Contraseña</label>
            <input type="password" id="password" name="password" onChange={(e) => setClave(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
          </div>
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"  onClick={() => ingresar()}>Ingresar</button>
        {/*
        <div className="mt-6 text-blue-500 text-center">
          <a href="#" className="hover:underline">Sign up Here</a>
        </div>
      */}
      </div>
    </div>
  </>)
}

export default Login;
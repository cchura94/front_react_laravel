import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import authService from "./../services/authService"
import MessageService from "./../services/MessageService"

function Login() {

  const navigate = useNavigate()

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

      navigate("/admin/categoria")

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
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => ingresar()}>INGRESAR</button>

<button onClick={() => msg()}>Enviar Mensaje Whatsapp</button>

<br />
<button onClick={() => getPerfil()}>Obtener Perfil</button>
<br />
{ JSON.stringify(datosPerfil) }
<div class="bg-gray-100 flex justify-center items-center h-screen">

<div class="w-1/2 h-screen hidden lg:block">
  <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" class="object-cover w-full h-full" />
</div>
<div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form action="#" method="POST">
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Username</label>
      <input type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
    </div>
    <div class="mb-4 flex items-center">
      <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
  </form>
  <div class="mt-6 text-blue-500 text-center">
    <a href="#" class="hover:underline">Sign up Here</a>
  </div>
</div>
</div>
    </>)
}

export default Login;
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./Pages/Home/Home"
import Register from './Pages/Register/Register'
import LogIn from './Pages/LogIn/LogIn'
import { createContext, useEffect, useState } from 'react'
import axios from './API/axiosConfig'
import Header from './Components/Header/Header'
export const AppState = createContext();
function App() {
  const [user , setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const {data} = await axios.get("users/check" , {
        headers: {
          Authorization: "Bearer" + token
        }
      })
      setUser(data);
    } catch (error) {
      console.log(error.message)
      navigate("/login")
    }
  }
  useEffect(()=>{
    checkUser();
  }, []);
  return (

    <AppState.Provider value = {{user, setUser}}>
      <Routes>
      <Header/>
        <Route path='/' element={ <Home/>} />
        <Route path='/login' element={ <LogIn/>} />
        <Route path='/register' element={ <Register/>} />
      </Routes>
    </AppState.Provider>
  )
}

export default App

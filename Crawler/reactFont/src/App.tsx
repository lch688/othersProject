import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Loginpage from './Pages/login/index'
import Home from './Pages/home/index'
import axios from "axios";


axios.defaults.withCredentials=true


export const App :React.FC = () =>{
  return(
    <div>

          <BrowserRouter>

              <Routes>
                  
                <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Loginpage />} />

                  


              </Routes>

          </BrowserRouter>


    </div>
  
  )
   

}
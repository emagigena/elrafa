import React from 'react'
import Inicio from './Inicio.js'
import Inicio2 from './inicio2.js'
import Inicio3 from './Inicio3'
import Inicio4 from './Inicio4.js'
import './InicioContainer.css'
import Footer from '../Footer/Footer'
export default function InicioContainer() {
  return (
    <div>
    <div className='inicioContainer'>
       <li> <Inicio/> </li>
       <li> <Inicio2/> </li>
       <li> <Inicio3/> </li>
       <li> <Inicio4/> </li>
       
    </div>
     <Footer/>
    </div>
  )
}

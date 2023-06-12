import React from 'react'
import { Carousel  } from 'react-bootstrap'
import './Inicio.css'



function Inicio() {
  return (
          <div className="galeria">
     
              <Carousel>
              <Carousel.Item>
              <img className="uno" src="/Images/1.png" alt="First slide"/>
              </Carousel.Item>
              <Carousel.Item>
              <img className="dos" src="/Images/2.png" alt="First slide"/>
              </Carousel.Item>
              <Carousel.Item>
              <img className="tres" src="/Images/3.png" alt="Second slide"/>
              </Carousel.Item>
              <Carousel.Item>
              <img className="cuatro" src="/Images/4.png" alt="Third slide"/>
              </Carousel.Item>
              <Carousel.Item>
              <img className="cinco" src="/Images/5.png" alt="Third slide"/>
              </Carousel.Item>
              <Carousel.Item>
              <img className='seis' src='/Images/6.png' alt='third slide'/>
              </Carousel.Item>
              <Carousel.Item>
              <img className='siete' src='/Images/7.png' alt='third slide'/>
              </Carousel.Item>
              <Carousel.Item>
              <img className='ocho' src='/Images/8.png' alt='third slide'/>
              </Carousel.Item>
              <Carousel.Item>
              <img className='nueve' src='/Images/9.png' alt='third slide'/>
              </Carousel.Item>
              </Carousel>

          </div> 
  )
}
export default Inicio


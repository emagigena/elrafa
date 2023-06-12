import React from 'react'
import { Card, Button, Placeholder } from 'react-bootstrap'
import "./Inicio2.css"

export default function inicio2() {
  return (
     <div className='CardsInfo'>
         

         <div className="d-flex">
            <Card className='cards' style={{ width: "18rem" }}>
            <Card.Img variant="top" src="https://productos.mjmusic.com.ar/images/00000000000M4UEX92422M4UEX.jpg" />
            <Card.Body>
                <Card.Title>Monitores Amps Bafles y Sistemas de Audio</Card.Title>
                <Card.Text>
                Todo en Audio, para bandas, musica en vivo, producción musical, en Instrumental Santa Fe
                </Card.Text>
                
            </Card.Body>
            </Card>
            </div>
        
        <div className='d-flex'>
            <Card className='cards' style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://productos.mjmusic.com.ar/images/00000000000K270063628k2700-1.jpg" />
            <Card.Body>
            <Card.Title>Pianos Teclados y Controladores</Card.Title>
                <Card.Text>
                Gran variedad de teclas, marcas como korg, alesis, casio, parquer y mucho más
                </Card.Text>
               
            </Card.Body>
            </Card>
     </div>
        <div className='d-flex'>
            <Card className='cards' style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://productos.mjmusic.com.ar/images/00VTTHREE22NMCAB65652VTTHREE22NMCAB.jpg" />
            <Card.Body>
            <Card.Title>Percusión</Card.Title>
                <Card.Text>
                Percusión Acústica y Eléctrica, Baterías eléctricas y acústicas, Parquer, Mapex, Yamaha,todas las marcas
                </Card.Text>
               
            </Card.Body>
            </Card>
        </div> 
    </div>
            
  )
}

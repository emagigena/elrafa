import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Item.css';
import ShowCarousel from './Carousel/Carousel';
import { Link } from 'react-router-dom';

function Item ( {prod} ) {
    return(
    <li>
        <Card className='card1'>
            <ShowCarousel fotos={prod.FOTOS}/>
            <Card.Body>
                <Card.Title className='ProductName'>{prod.NOMBRE}</Card.Title>
                <Card.Title>$ {prod.PRECIO}</Card.Title>
                <Link to={`/detalle/${prod.id}`}>
                    <Button variant="none" className="btn" style={{backgroundColor: "red", color: "white"}}>Ver Detalle</Button>
                </Link>
            </Card.Body>
        </Card>
    </li>
    )
}

export default Item;
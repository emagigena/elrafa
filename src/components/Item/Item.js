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
            <ShowCarousel fotos={prod.fotos}/>
            <Card.Body>
                <Card.Title className='ProductName'>{prod.nombre}</Card.Title>
                <Card.Title>$ {prod.precio}</Card.Title>
                <Link to={`/detalle/${prod.id}`}>
                    <Button variant="primary">Ver el detalle</Button>
                </Link>
            </Card.Body>
        </Card>
    </li>
    )
}

export default Item;
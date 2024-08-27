import React, { FC } from 'react';
import { Card } from 'react-bootstrap';


// Описывает внутренности карты
interface ICard {
    /** Загаловок */
    title: string;
    /** Текст */
    shortText?: string;
}

const CardsLocation: FC<ICard> = ({ title, shortText }) => (

    <Card className='cardLocation '>
        <Card.Body>
            <Card.Title as="h3" className="mt-4">{title}</Card.Title>
            <Card.Text>{shortText}</Card.Text>
        </Card.Body>
    </Card>
);

export default CardsLocation;
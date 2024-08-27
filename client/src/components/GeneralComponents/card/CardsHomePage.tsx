import React, { FC } from 'react';
import { Card,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomButton from '../button/CustomButton';


// Описывает внутренности карты
interface ICard {
    /** Ссылка */
    imgSrc: string;
    /** Загаловок */
    title: string;
    /** Текст */
    text: string;
    /** Редирект на страницу */
    link: string;
}

const CardsHomePage: FC<ICard> = ({ imgSrc, title, text, link }) => (

    <Card>
        <Card.Body>
            <Card.Img draggable={false} src={imgSrc}></Card.Img>
            <Card.Title as="h3" className="mt-4">{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
            <Link to={link}>
                <CustomButton>
                    Подробние
                </CustomButton>
            </Link>
        </Card.Body>
    </Card>
);

export default CardsHomePage;
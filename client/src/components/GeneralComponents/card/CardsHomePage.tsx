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

function handlerClick() {
    window.scrollTo(0,0)
}

const CardsHomePage: FC<ICard> = ({ imgSrc, title, text, link }) => (

    <Card>
        <Card.Body>
            <Card.Img draggable={false} src={imgSrc}></Card.Img>
            <Card.Title  as="h3" className="mt-4 text-preWrap">{title}</Card.Title>
            <Card.Text className='text-preWrap'>{text}</Card.Text>
            <Link to={link} className='mt-auto'>
                <CustomButton onClick={handlerClick}>
                    Подробние
                </CustomButton>
            </Link>
        </Card.Body>
    </Card>
);

export default CardsHomePage;
import { FC, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CardsHomePage from '../card/CardsHomePage';
import DataItemService from '../../../services/dataItemService';
import { ICardDataHomePage } from '../../../models/ICardDataHomePage';

interface ICarusel {
    /**
     * Какие элементы будут загружаться
     * @example hero, item */
    branch?: string;
}

const fetchDataItems = async (branch: string) => {
    switch (branch) {
        case 'hero':
            return await DataItemService.getItemsByHero();
        case 'item':
            return await DataItemService.getItemsByItem();
        default:
            throw new Error('Несуществующая ветка');
    }
};

const renderCarouselItems = (data: ICardDataHomePage[]) => {
    const items = data.map((item: ICardDataHomePage) => (
        <CardsHomePage key={item.id}
            imgSrc={`${process.env.REACT_APP_GET_IMAGE_URL}${item.imageOfItems[0]?.url}`}
            title={item.title}
            text={item.description}
            link={`/itemsById/${item.categoryId}/id/${item.id}`}
        />
    ));
    return items;
};

const groupItems = (items: JSX.Element[], groupSize: number) => {
    const groups: JSX.Element[] = [];
    for (let i = 0; i < items.length; i += groupSize) {
        groups.push(
            <Carousel.Item key={i}>
                {items.slice(i, i + groupSize)}
            </Carousel.Item>
        );
    }
    return groups;
};

const CaruselHomePage: FC<ICarusel> = ({ branch = 'hero' }) => {
    const [carouselItems, setCarouselItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchAndSetCarouselItems = async () => {
            try {
                const data = await fetchDataItems(branch);
                const items = renderCarouselItems(data.data);
                const groupedItems = groupItems(items, 3);
                setCarouselItems(groupedItems);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setCarouselItems([<p key="error">Нет данных</p>]);
            }
        };

        fetchAndSetCarouselItems();
    }, [branch]);

    return (
        <Carousel indicators={false} className="carouselHome" interval={6000} touch={false}>
            {carouselItems}
        </Carousel>
    );
};

export default CaruselHomePage;

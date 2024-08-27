import { FC, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CardsHomePage from '../card/CardsHomePage';
import DataItemService from '../../../services/dataItemService';

interface ICarusel {
    /**
     * Какие элементы будут загружаться
     * @example hero, item
     */
    branch?: string;
}

interface IDataItem {
    id: number;
    title: string;
    description: string;
    categoryId:number,
    imageOfItems: { url: string }[];
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

const renderCarouselItems = (data: IDataItem[]) => {
    return data.map((item: IDataItem) => (
        <CardsHomePage
            key={item.id}
            imgSrc={`${process.env.REACT_APP_GET_IMAGE_URL}${item.imageOfItems[0]?.url}`}
            title={item.title}
            text={item.description}
            link={`/itemsById/${item.categoryId}/id/${item.id}`}
        />
    ));
};

const CaruselHomePage: FC<ICarusel> = ({ branch = 'hero' }) => {
    const [carouselItem, setCarouselItem] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const fetchAndSetCarouselItems = async () => {
            try {
                const data = await fetchDataItems(branch);
                setCarouselItem(<>{renderCarouselItems(data.data)}</>);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setCarouselItem(<p>Нет данных</p>);
            }
        };

        fetchAndSetCarouselItems();
    }, [branch]);

    return (
        <div>
            <Carousel indicators={false} className="carouselHome" interval={6000} touch={false}>
                <Carousel.Item>{carouselItem}</Carousel.Item>
            </Carousel>
        </div>
    );
};

export default CaruselHomePage;

import { useParams } from 'react-router-dom';
import DataItemService from '../services/dataItemService';
import { useEffect, useState } from 'react';
import CardsHomePage from '../components/GeneralComponents/card/CardsHomePage';
import ImageLineHomeComponents from '../components/HomePage/ImageLineHomeComponents';
import CarouselWithThumbnails from '../components/GeneralComponents/carousel/CarouselWithThumbnails/CarouselWithThumbnails';

interface IDataItems {
    id: number,
    title: string,
    description: string,
    updatedAt: string,
    countryId: number,
    imageOfItems: {
        id: number,
        url: string,
    }[],
}

const HeroesOrItemsPage = () => {
    const { categoryId, id } = useParams();
    const [itemsData, setItemsData] = useState<IDataItems[]>([]);
    const [itemSelected, setItemSelected] = useState<IDataItems | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchDataItems = async () => {
        try {
            switch (Number(categoryId)) {
                case 1:
                    return await DataItemService.getItemsByHero();
                case 2:
                    return await DataItemService.getItemsByItem();
                default:
                    throw new Error('Несуществующая ветка');
            }
        } catch (error: any) {
            setError(error.message || 'Ошибка при получении данных');
            throw error;
        }
    };

    const fetchSelectedItem = async () => {
        try {
            return await DataItemService.getItem(Number(id));
        } catch (error: any) {
            setError(error.message || 'Ошибка при получении данных элемента');
            throw error;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [itemsResponse, selectedItemResponse] = await Promise.all([
                    fetchDataItems(),
                    fetchSelectedItem(),
                ]);

                setItemsData(itemsResponse.data);
                setItemSelected(selectedItemResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, [categoryId, id]); 

    return (
        <main className="heroesOrItemsPage">
            {error && <p>{error}</p>}
            <CarouselWithThumbnails items={itemSelected ? [itemSelected] : []} />
            <ImageLineHomeComponents />
            <section className="wrapper carouselHome mt-3 mb-3">
                {itemsData.map((item) => (
                    <CardsHomePage
                        key={item.id}
                        imgSrc={`${process.env.REACT_APP_GET_IMAGE_URL}${item.imageOfItems[0]?.url}`}
                        title={item.title}
                        text={item.description}
                        link={`http://localhost:3000/itemsById/${categoryId}/id/${item.id}`}
                    />
                ))}
            </section>
        </main>
    );
};

export default HeroesOrItemsPage;

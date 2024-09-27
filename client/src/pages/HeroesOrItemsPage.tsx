import { useParams } from 'react-router-dom';
import DataItemService from '../services/dataItemService';
import { useEffect, useState, useCallback } from 'react';
import CardsHomePage from '../components/GeneralComponents/card/CardsHomePage';
import CarouselWithThumbnails from '../components/GeneralComponents/carousel/CarouselWithThumbnails/CarouselWithThumbnails';
import FormCreateHeroesOrItemsComponent from '../components/HeroesOrItemsComponents/FormCreateHeroesOrItemsComponent';
import CommonLine from '../components/GeneralComponents/line/CommonLine';

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
    const [categoryName, setCategoryName] = useState<string>('')

    const fetchDataItems = useCallback(async () => {
        try {
            switch (Number(categoryId)) {
                case 1:
                    setCategoryName("Персонаж")
                    return await DataItemService.getItemsByHero();
                case 2:
                    setCategoryName("Предмет")
                    return await DataItemService.getItemsByItem();
                default:
                    throw new Error('Несуществующая категория');
            }
        } catch (error: any) {
            setError(error.message || 'Ошибка при получении данных');
            throw error;
        }
    }, [categoryId]);

    const fetchSelectedItem = useCallback(async () => {
        try {
            return await DataItemService.getItem(Number(id));
        } catch (error: any) {
            setError(error.message || 'Ошибка при получении данных элемента');
            throw error;
        }
    }, [id]);

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
    }, [fetchDataItems, fetchSelectedItem]);











    return (
        <main className="heroesOrItemsPage">
            {error && <p>{error}</p>}

            {
                itemSelected ? <CarouselWithThumbnails items={itemSelected ? [itemSelected] : []} /> : <></>
            }

            <CommonLine title={`${categoryName}`} text='Просматривайте наш обширный каталог персонажей и предметов, каждый из которых имеет свою уникальную историю и цель' />

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
            <FormCreateHeroesOrItemsComponent />
        </main>

    );
};

export default HeroesOrItemsPage;

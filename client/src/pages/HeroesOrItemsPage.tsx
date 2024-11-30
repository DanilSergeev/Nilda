import { useParams } from 'react-router-dom';
import DataItemService from '../services/dataItemService';
import { useEffect, useState, useCallback } from 'react';
import CardsHomePage from '../components/GeneralComponents/card/CardsHomePage';
import FormCreateHeroesOrItemsComponent from '../components/HeroesOrItemsComponents/FormCreateHeroesOrItemsComponent';
import CommonLine from '../components/GeneralComponents/line/CommonLine';
import CustomAlert from '../components/GeneralComponents/alert/CustomAlert';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import CarouselTarget from '../components/HeroesOrItemsComponents/CarouselTarget';
import { itemSlice } from '../store/reducers/ItemSlice';
import { itemsSlice } from '../store/reducers/ItemsSlice';

const HeroesOrItemsPage = () => {
    const authUser = useAppSelector(state => state.AuthSlice)
    const itemsData = useAppSelector(state => state.ItemsSlice)
    const itemSelected = useAppSelector(state => state.ItemSlice)
    const dispatch = useAppDispatch()
    const { setItems } = itemsSlice.actions 
    const { setItem, unSetItem } = itemSlice.actions


    const { categoryId, id } = useParams();
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

                dispatch(setItems(itemsResponse.data))
                if (selectedItemResponse.data) {
                    dispatch(setItem(selectedItemResponse.data));
                } else {
                    dispatch(unSetItem());
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, [dispatch, fetchDataItems, fetchSelectedItem, setItems, setItem, unSetItem]);




    return (
        <>
            <main className="heroesOrItemsPage">
                {error && <p>{error}</p>}
                {
                    itemSelected.id !== 0 ? <CarouselTarget /> : <></>
                }
                <CommonLine title={`${categoryName}`} text='Просматривайте наш обширный каталог персонажей и предметов, каждый из которых имеет свою уникальную историю и цель' />
                <section className="wrapper carouselHome mt-3 mb-3">
                    {
                        !itemsData.data || itemsData.data.length === 0 ?
                            <div>Нет элементов для отображения</div>
                            :
                            itemsData.data.map((item) => ( 
                                <CardsHomePage
                                    key={item.id}
                                    imgSrc={`${process.env.REACT_APP_GET_IMAGE_URL}${ item.imageOfItems[0]?  item.imageOfItems[0]?.url: 'noimage.jpg'}`}
                                    title={item.title.length > 25 ? item.title.substr(0, 25) + "..." : item.title}
                                    text={item.description.length > 90 ? item.description.substr(0, 90) + "..." : item.description}
                                    link={`/itemsById/${categoryId}/id/${item.id}`}
                                />
                            ))

                    }
                </section>
                {
                    authUser.role === "ADMIN" ?
                        <FormCreateHeroesOrItemsComponent />
                        :
                        <></>
                }
            </main>
            <CustomAlert />
        </>
    );
};
export default HeroesOrItemsPage;
import { useParams } from 'react-router-dom';
import DataItemService from '../services/dataItemService';
// import AuxiliaryDataService from '../services/auxiliaryDataService';
import { useEffect, useState } from 'react';
import CardsHomePage from '../components/GeneralComponents/card/CardsHomePage';
import ImageLineHomeComponents from '../components/HomePage/ImageLineHomeComponents';
import CarouselWithThumbnails from '../components/GeneralComponents/carousel/CarouselWithThumbnails/CarouselWithThumbnails';


// interface Icategory {
//     data: {
//         id: number,
//         name: string
//     }
// }
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
    // const [category, setCategory] = useState<string | null>(null);
    const [itemsData, setItemsData] = useState<IDataItems[]>([]);
    const [itemSelected, setItemSelected] = useState<IDataItems | null>(null)

    const fetchDataItems = async () => {
        switch (Number(categoryId)) {
            case 1:
                return await DataItemService.getItemsByHero();
            case 2:
                return await DataItemService.getItemsByItem();
            default:
                throw new Error('Несуществующая ветка');
        }
    };
    // const getCategory = async () => {
    //     try {
    //         const response: Icategory | [] = await AuxiliaryDataService.getCategory(Number(categoryId))
    //         setCategory(response.data.name)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const getItems = async () => {
        try {
            const response = await fetchDataItems()
            setItemsData(response.data)
        } catch (error) {
            console.error(error)
        }
    }


    const selectedHero = async () => {
        try {
            const response = await DataItemService.getItem(Number(id));
            setItemSelected(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // getCategory()
        getItems()
        selectedHero()
    }, [categoryId, id])


    return (
        <main className='heroesOrItemsPage'>
            <CarouselWithThumbnails items={itemSelected ? [itemSelected] : []} />
            
            <ImageLineHomeComponents/>

            <section className='wrapper carouselHome mt-3 mb-3'>
                {itemsData.map(item => (
                    <CardsHomePage key={item.id} imgSrc={process.env.REACT_APP_GET_IMAGE_URL + item.imageOfItems[0]?.url}
                    title = { item.title } text = { item.description } link={`http://localhost:3000/itemsById/${categoryId}/id/${item.id}`} />
                ))}
            </section>
        </main>
    )
}

export default HeroesOrItemsPage
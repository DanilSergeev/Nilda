import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CustomButton from '../GeneralComponents/button/CustomButton';
import MyModal from '../GeneralComponents/modal/MyModal';
import { Form } from 'react-bootstrap';
import { modalSlice } from '../../store/reducers/ModalSlice';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { itemSlice } from '../../store/reducers/ItemSlice';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import { ICatrgoryOrCountry } from '../../models/ICatrgoryAndCountry';
import DataItemService from '../../services/dataItemService';
import AuxiliaryDataServic from '../../services/auxiliaryDataService';
import classes from '../../components/GeneralComponents/carousel/module/CarouselWithThumbnails.module.css';
import { useNavigate } from 'react-router-dom';



interface IImageItem {
    id: number;
    url: string;
}
interface IInputData {
    title: string;
    description: string;
    categoryId: number;
    countryId: number;
    imageOfItems: IImageItem[];
}


interface IFormTargetUpdataHeroesOrItemsProps {
    handlerChangeEditor: () => void,
}

const FormTargetUpdataHeroesOrItems: FC<IFormTargetUpdataHeroesOrItemsProps> = ({ handlerChangeEditor }) => {
    const dataItem = useAppSelector(state => state.ItemSlice)
    const { removeItems, updateItems } = itemsSlice.actions
    const { showModal, hideModal } = modalSlice.actions
    const { unSetItem, setItem } = itemSlice.actions
    const { showAlert } = alertSlice.actions

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [countries, setCountries] = useState<ICatrgoryOrCountry[]>([]);
    const [categorys, setCategorys] = useState<ICatrgoryOrCountry[]>([]);
    const [addFile, setAddFile] = useState<File | null>(null);
    const [inputData, setInputData] = useState<IInputData>({
        title: '',
        description: '',
        categoryId: 0,
        countryId: 0,
        imageOfItems: []
    })

    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    const handleImageSelect = (imageId: number) => {
        setSelectedImages((prev) => {
            if (prev.includes(imageId)) {
                return prev.filter(id => id !== imageId);
            } else {
                return [...prev, imageId];
            }
        });
    };





    function funShowModalDel() {
        dispatch(showModal({ show: true, title: "Форма удаления", text: "Подтвердите удаление элемента", }));
    }

    const fetchCountries = async () => {
        try {
            const countries = await AuxiliaryDataServic.getCountrys();
            setCountries(countries.data);
        } catch (error) {
            throw error;
        }
    };
    const fetchCategorys = async () => {
        try {
            const categorys = await AuxiliaryDataServic.getCategorys();
            setCategorys(categorys.data);
        } catch (error) {
            throw error;
        }
    };

    async function sendQueryUpdata() {
        try {
            const { id, imageOfItems } = dataItem
            await DataItemService.updateItem(id, inputData.title, inputData.description, inputData.categoryId, inputData.countryId);
            if (inputData.categoryId !== dataItem.categoryId) {
                navigate(`/itemsById/${inputData.categoryId}/id/${id}`, { replace: true });
            }
            dispatch(updateItems({ id, title: inputData.title, description: inputData.description, updatedAt: new Date().toISOString(), countryId: inputData.countryId, categoryId: inputData.categoryId, imageOfItems }))
            dispatch(setItem({ id, title: inputData.title, description: inputData.description, updatedAt: new Date().toISOString(), countryId: inputData.countryId, categoryId: inputData.categoryId, imageOfItems }))
            dispatch(showAlert({ show: true, text: `Успешно обновлено`, variant: 'success' }));
            handlerChangeEditor()
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error)
        }
    }
    async function sendQueryDeliteImages() {
        try {
            await DataItemService.deleteImagesOfItem(dataItem.id, selectedImages);
            let { id, title, description, countryId, categoryId, imageOfItems } = dataItem
            imageOfItems = imageOfItems.filter(item => !selectedImages.includes(item.id))
            dispatch(updateItems({ id, title, description, updatedAt: new Date().toISOString(), countryId, categoryId, imageOfItems }))
            dispatch(setItem({ id, title, description, updatedAt: new Date().toISOString(), countryId, categoryId, imageOfItems }))
            dispatch(showAlert({ show: true, text: `Успешно обновлено`, variant: 'success' }));
            handlerChangeEditor()
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error)
        }
    }
    async function sendQueryAddImage() {
        try {
            const formData = new FormData();
            formData.append('file', addFile as File);
            const data = await DataItemService.updateItemImages(dataItem.id, formData);
            let { id, title, description, countryId, categoryId, imageOfItems, } = data.data
            dispatch(updateItems({ id, title, description, updatedAt: new Date().toISOString(), countryId, categoryId, imageOfItems }))
            dispatch(setItem({ id, title, description, updatedAt: new Date().toISOString(), countryId, categoryId, imageOfItems }))
            dispatch(showAlert({ show: true, text: `Успешно обновлено`, variant: 'success' }));
            handlerChangeEditor()
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error)
        }
    }

    const sendQueryDelete = async () => {
        try {
            const res = await DataItemService.deleteItem(dataItem.id);
            dispatch(removeItems(dataItem.id))
            dispatch(showAlert({ show: true, text: `${res.data}`, variant: 'success' }));
            dispatch(hideModal());
            dispatch(unSetItem())
            handlerChangeEditor()
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error);
        }
    };


    useEffect(() => {
        if (dataItem.id !== 0) {
            setInputData(prev => ({
                ...prev,
                title: dataItem.title,
                description: dataItem.description,
                countryId: dataItem.countryId,
                categoryId: dataItem.categoryId,
                imageOfItems: dataItem.imageOfItems,
            }));
            setSelectedImages([]);
        }
    }, [categorys, dataItem]);

    useEffect(() => {
        fetchCountries();
        fetchCategorys();
    }, []);


    return (
        <>
            <Form className='wrapper '>
                <h2>Форма обновления</h2>
                <Form.Group className="mb-3" >
                    <Form.Label>Введите страну:</Form.Label>
                    <Form.Select
                        onChange={(e) => setInputData((prev) => ({ ...prev, countryId: Number(e.target.value) }))}
                        className='mb-3'
                        value={inputData.countryId}
                        aria-label='Default select'
                    >
                        <option value='' disabled>
                            Выберите страну
                        </option>
                        {countries.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Введите категорию:</Form.Label>
                    <Form.Select
                        onChange={(e) => setInputData((prev) => ({ ...prev, categoryId: Number(e.target.value) }))}
                        className='mb-3'
                        value={inputData.categoryId}
                        aria-label='Default select'
                    >
                        <option value='' disabled>
                            Выберите категорию
                        </option>
                        {categorys.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Введите загаловок:</Form.Label>
                    <Form.Control
                        value={inputData.title}
                        onChange={(e) => setInputData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Введите загаловок"
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Введите описание:</Form.Label>
                    <Form.Control
                        value={inputData.description}
                        onChange={(e) => setInputData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Введите описание"
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Управляйте изображениями</Form.Label>
                    <ul className={classes.carousel__thumbnails}>
                        {inputData.imageOfItems[0]?.id === 0 ?
                            <></>
                            : inputData.imageOfItems.map((image, imageIndex) => (
                                <li key={`thumbnail-${dataItem.id}-${imageIndex}`} className={selectedImages.includes(image.id) ? classes.activeForDel : ''}>
                                    <input
                                        type="checkbox"
                                        checked={selectedImages.includes(image.id)}
                                        onChange={() => handleImageSelect(image.id)}
                                        id={`image-checkbox-${image.id}`}
                                    />
                                    <label htmlFor={`image-checkbox-${image.id}`}>
                                        <img src={process.env.REACT_APP_GET_IMAGE_URL + image.url} alt={dataItem.title} />
                                    </label>
                                </li>
                            ))}
                        {
                            <li className={classes.addImages}>
                                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clipRule="evenodd" fill="#767676" fillRule="evenodd"><path d="m12 18c-.5523 0-1-.4477-1-1v-9.37868c0-.44545-.5386-.66854-.8536-.35356l-2.43929 2.43934c-.39053.3905-1.02369.3905-1.41422 0-.39052-.39052-.39052-1.02369 0-1.41421l5.00001-5c.3905-.39052 1.0237-.39052 1.4142 0l5 5c.3905.39053.3905 1.02369 0 1.41422-.3905.39049-1.0237.39049-1.4142 0l-2.4393-2.43934c-.315-.31499-.8536-.0919-.8536.35355v9.37868c0 .5523-.4477 1-1 1z" /><path d="m5 20c0-.5523.44772-1 1-1h12c.5523 0 1 .4477 1 1s-.4477 1-1 1h-12c-.55228 0-1-.4477-1-1z" /></g></svg>
                                <label >
                                    <input type="file" onChange={(e: any) => setAddFile(e.target.files[0])} />
                                </label>
                            </li>
                        }
                    </ul>
                    {
                        selectedImages.length > 0 ?
                            <CustomButton className="mb-5" themeColor='Red' onClick={(event: any) => { event.preventDefault(); sendQueryDeliteImages() }} >Удалить выделенные изображения</CustomButton>
                            :
                            <></>
                    }
                    {
                        !!addFile ?
                            <CustomButton className="mb-5" themeColor='Green' onClick={(event: any) => { event.preventDefault(); sendQueryAddImage(); }} >Добавить изоброжение</CustomButton>
                            :
                            <></>
                    }
                </Form.Group>
            </Form>

            <div className='wrapper d-flex justify-content-around mb-3'>
                <CustomButton onClick={sendQueryUpdata} themeColor='Blue'>Сохронить</CustomButton>
                <CustomButton onClick={handlerChangeEditor}>Отмена режима редактирования</CustomButton>
                <CustomButton themeColor='Red' onClick={funShowModalDel}>Удалить элемент</CustomButton>
            </div>

            <MyModal>
                <div className='d-flex justify-content-between mt-4'>
                    <CustomButton onClick={() => dispatch(hideModal())}>Отмена</CustomButton>
                    <CustomButton themeColor='Red' onClick={sendQueryDelete}>Удалить</CustomButton>
                </div>
            </MyModal>
        </>
    );
};

export default FormTargetUpdataHeroesOrItems;

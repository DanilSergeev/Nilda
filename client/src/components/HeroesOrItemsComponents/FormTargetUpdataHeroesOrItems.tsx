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

    const [countries, setCountries] = useState<ICatrgoryOrCountry[]>([]);
    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        countryId: 0,
        imageOfItems: []
    })


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

    async function sendQueryUpdata() {
        try {
            // await DataItemService.updateItem(ideaTargetData.id, title, text);
            const { id, countryId, imageOfItems } = dataItem
            dispatch(updateItems({ id, title: inputData.title, description: inputData.description, updatedAt: new Date().toISOString(), countryId, imageOfItems }))
            dispatch(setItem({ id, title: inputData.title, description: inputData.description, updatedAt: new Date().toISOString(), countryId, imageOfItems }))
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
            setInputData(prev => ({ ...prev, title: dataItem.title, description: dataItem.description, countryId: dataItem.countryId }));
        }
    }, [dataItem]);

    useEffect(() => {
        fetchCountries();
    }, []);


    return (
        <>
            <Form className='wrapper '>
                <h2>Форма обновления</h2>
                <Form.Group className="mb-3" >
                    <Form.Label>Введите страну</Form.Label>
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
                    <Form.Label>Введите загаловок</Form.Label>
                    <Form.Control
                        value={inputData.title}
                        onChange={(e) => setInputData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Введите загаловок"
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Введите описание</Form.Label>
                    <Form.Control
                        value={inputData.description}
                        onChange={(e) => setInputData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Введите описание"
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Вставте фото: </Form.Label>
                    {/* <Form.Control
                    onChange={} 
                    type='file'
                    multiple 
                  /> */}
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

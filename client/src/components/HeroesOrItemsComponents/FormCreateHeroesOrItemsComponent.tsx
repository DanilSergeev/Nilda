import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';
import AuxiliaryDataServic from '../../services/auxiliaryDataService';
import DataItemService from '../../services/dataItemService';
import { ICatrgoryOrCountry } from '../../models/ICatrgoryAndCountry';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { IDataInput } from '../../models/IDataInput';
import { itemsSlice } from '../../store/reducers/ItemsSlice';



const FormCreateHeroesOrItemsComponent: React.FC = () => {
  const { categoryId = 0 } = useParams();
  const dispatch = useAppDispatch()
  const { showAlert, hideAlert } = alertSlice.actions
  const { addItems } = itemsSlice.actions

  const [countries, setCountries] = useState<ICatrgoryOrCountry[]>([]);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [inputData, setInputData] = useState<IDataInput>({
    title: '',
    text: '',
    country: 0,
    file: null,
  });

  const fetchCountries = async () => {
    try {
      const countries = await AuxiliaryDataServic.getCountrys();
      setCountries(countries.data);
    } catch (error) {
      throw error;
    }
  };

  const validateInputData = useCallback(() => {
    if (
      categoryId &&
      inputData.country &&
      inputData.title &&
      inputData.text &&
      inputData.file
    ) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }, [categoryId, inputData.country, inputData.file, inputData.text, inputData.title]);


  const sendDataCreate = async () => {
    dispatch(hideAlert())
    try {
      const formData = new FormData();
      formData.append('title', inputData.title);
      formData.append('description', inputData.text);
      formData.append('categoryId', categoryId.toString());
      formData.append('countryId', inputData.country.toString());
      formData.append('file', inputData.file as File);

      let data = await DataItemService.creatItem(formData);
      dispatch(addItems({...data, imageOfItems:[{id: 1, url:`noimage.jpg`}]}));
      dispatch(showAlert({ show: true, text: 'Объект успешно создан (Обновите страницу для получения изоброжений)', variant: 'success' }))
    } catch (error: any) {
      console.error('Error object:', error);
      if (error?.response?.data?.message !== undefined) {
        dispatch(showAlert({ show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: 'danger' }))
      } else {
        dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }))
      }
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    validateInputData();
  }, [validateInputData]);

  return (
    <section>
      <h2>Форма создания</h2>
      <Form onSubmit={(e) => e.preventDefault()} className='wrapper'>
        <Form.Group className='mb-3'>
          <Form.Label>Введите название</Form.Label>
          <Form.Control
            maxLength={255}
            value={inputData.title}
            onChange={(e) => setInputData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder='Введите название'
          />
        </Form.Group>

        <Form.Select
          onChange={(e) => setInputData((prev) => ({ ...prev, country: Number(e.target.value) }))}
          className='mb-3'
          defaultValue=''
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

        <Form.Group className='mb-3'>
          <Form.Label>Введите описание</Form.Label>
          <Form.Control
            value={inputData.text}
            onChange={(e) => setInputData((prev) => ({ ...prev, text: e.target.value }))}
            placeholder='Введите описание'
            as='textarea'
            rows={3}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Вставте фото: </Form.Label>
          <Form.Control
            onChange={(e: any) => setInputData((prev) => ({ ...prev, file: e.target.files[0] }))}
            type='file'
          />
        </Form.Group>
        <CustomButton disabled={buttonIsDisabled} onClick={sendDataCreate}>
          Создать
        </CustomButton>
      </Form>
    </section>
  );
};

export default FormCreateHeroesOrItemsComponent;
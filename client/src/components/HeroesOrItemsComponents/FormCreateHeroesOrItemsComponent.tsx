import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';
import AuxiliaryDataServic from '../../services/auxiliaryDataService';
import DataItemService from '../../services/dataItemService';
import Alert from 'react-bootstrap/Alert';
import { ICatrgoryOrCountry } from '../../models/ICatrgoryAndCountry';


interface IDataInput {
  title: string;
  text: string;
  category: number;
  country: number;
  file: File | null;
}

const FormCreateHeroesOrItemsComponent: React.FC = () => {
  const [inputData, setInputData] = useState<IDataInput>({
    title: '',
    text: '',
    category: 0,
    country: 0,
    file: null,
  });

  const [categories, setCategories] = useState<ICatrgoryOrCountry[]>([]);
  const [countries, setCountries] = useState<ICatrgoryOrCountry[]>([]);
  const [alertSetting, setAlertSetting] = useState({
    variant: 'success',
    show: false,
    text: '',
  });
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const validateInputData = useCallback(() => {
    if (
      inputData.category &&
      inputData.country &&
      inputData.title &&
      inputData.text &&
      inputData.file
    ) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }, [inputData]);

  useEffect(() => {
    fetchCategoriesAndCountries();
  }, []);


  
  const fetchCategoriesAndCountries = async () => {
    try {
      const [categories, countries] = await Promise.all([
        AuxiliaryDataServic.getCategorys(),
        AuxiliaryDataServic.getCountrys(),
      ]);

      setCategories(categories.data);
      setCountries(countries.data);
    } catch (error) {
      throw error;
    }
  };


  const sendDataCreate = async () => {
    setAlertSetting((prev) => ({ ...prev, show: false }));
    try {
      const formData = new FormData();
      formData.append('title', inputData.title);
      formData.append('description', inputData.text);
      formData.append('categoryId', inputData.category.toString());
      formData.append('countryId', inputData.country.toString());
      formData.append('file', inputData.file as File);

      await DataItemService.creatItem(formData);
      setAlertSetting((prev) => ({ ...prev, show: true, text: 'Объект успешно создан', variant: 'success' }));
    } catch (error:any) {
      console.error('Error object:', error);
      if (error?.response?.data?.message !== undefined) {
        setAlertSetting((prev) => ({ ...prev, show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: 'danger' }));
      } else {
        setAlertSetting((prev) => ({ ...prev, show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
      }
    }
  };


  useEffect(() => {
    if (alertSetting.show) {
      setTimeout(() => {
        setAlertSetting((prev) => ({ ...prev, show: false }));
      }, 5000);
    }
  }, [alertSetting.show]);

  useEffect(() => {
    validateInputData();
  }, [ validateInputData]);

  return (
    <>
      <section className='mb-5'>
        <h2>Форма создания</h2>
        <Form className='wrapper'>
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
            onChange={(e) => setInputData((prev) => ({ ...prev, category: Number(e.target.value) }))}
            className='mb-3'
            defaultValue=''
            aria-label='Default select'
          >
            <option value='' disabled>
              Выберите категорию
            </option>
            {categories.map((item) => (
              <option key ={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>

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
          <CustomButton disabled={buttonIsDisabled} type='button' onClick={sendDataCreate}>
            Создать
          </CustomButton>
        </Form>
      </section>

      <Alert show={alertSetting.show} variant={alertSetting.variant} onClick={() => setAlertSetting((prev) => ({ ...prev, show: false }))}>
        {alertSetting.text}
      </Alert>
    </>
  );
};

export default FormCreateHeroesOrItemsComponent;
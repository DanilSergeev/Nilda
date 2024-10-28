import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CustomButton from '../GeneralComponents/button/CustomButton';
import CarouselWithThumbnails from '../GeneralComponents/carousel/CarouselWithThumbnails/CarouselWithThumbnails';
import { Form } from 'react-bootstrap';
import MyModal from '../GeneralComponents/modal/MyModal';
import { modalSlice } from '../../store/reducers/ModalSlice';
import DataItemService from '../../services/dataItemService';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { itemSlice } from '../../store/reducers/ItemSlice';
import { itemsSlice } from '../../store/reducers/ItemsSlice';



const CarouselTarget: FC = () => {
  const authUser = useAppSelector(state => state.AuthSlice)
  const dataItem = useAppSelector(state => state.ItemSlice)
  const { showModal, hideModal } = modalSlice.actions
  const { showAlert } = alertSlice.actions
  const { unSetItem, setItem } = itemSlice.actions
  const { removeItems, updateItems } = itemsSlice.actions
  const dispatch = useAppDispatch()

  const [inputData, setInputData] = useState({
    title: '',
    description: '',
  })
  const [isEditor, setIsEditor] = useState(false)



  const handlerChangeEditor = () => {
    setIsEditor(prev => !prev)
  }

  function sendQueryUpdata() {
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


  function funShowModalDel() {
    dispatch(showModal({ show: true, title: "Форма удаления", text: "Подтвердите удаление элемента", }));
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
      setInputData(prev => ({ ...prev, title: dataItem.title, description: dataItem.description }));
    }
  }, [dataItem]);

  return (
    <>
      <section>
        {
          isEditor ? (
            <>
              <Form className='wrapper'>
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
              </Form>

              <div className='wrapper d-flex justify-content-around mb-3'>
                <CustomButton onClick={sendQueryUpdata} themeColor='Blue'>Сохронить</CustomButton>
                <CustomButton onClick={handlerChangeEditor}>Отмена режима редактирования</CustomButton>
                <CustomButton themeColor='Red' onClick={funShowModalDel}>Удалить элемент</CustomButton>
              </div>
            </>
          ) : (
            <>
              <CarouselWithThumbnails />
              {
                authUser.role === "ADMIN" ?
                  <div className='wrapper mb-3'>
                    <CustomButton onClick={handlerChangeEditor}>Редактировать</CustomButton>
                  </div>
                  :
                  <></>
              }
            </>
          )
        }
      </section>
      <MyModal>
        <div className='d-flex justify-content-between mt-4'>
          <CustomButton onClick={() => dispatch(hideModal())}>Отмена</CustomButton>
          <CustomButton themeColor='Red' onClick={sendQueryDelete}>Удалить</CustomButton>
        </div>
      </MyModal>
    </>
  );
};

export default CarouselTarget;

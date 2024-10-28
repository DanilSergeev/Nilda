import React, { useEffect, useState } from 'react';
import CustomButton from '../GeneralComponents/button/CustomButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Form } from 'react-bootstrap';
import IdeasService from '../../services/ideasService';
import { ideaSlice } from '../../store/reducers/IdeaSlice';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { modalSlice } from '../../store/reducers/ModalSlice';
import MyModal from '../GeneralComponents/modal/MyModal';
import { ideasSlice } from '../../store/reducers/IdeasSlice';


const TargetIdeaComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const ideaTargetData = useAppSelector(state => state.IdeaSlice)
    const authUser = useAppSelector(state => state.AuthSlice)
    const { setIdea, unSetIdea } = ideaSlice.actions
    const { updateIdeas, removeIdeas } = ideasSlice.actions
    const { showAlert } = alertSlice.actions
    const { showModal, hideModal } = modalSlice.actions

    const [isEditor, setIsEditor] = useState(false)
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handlerChangeEditor = () => {
        setIsEditor(prev => !prev)
    }

    const funShowModalDel = () => {
        dispatch(showModal({ show: true, title: "Форма удаления", text: "Подтвердите удаление элемента", }));
    };

    const sendQueryDelete = async () => {
        try {
            const res = await IdeasService.delIdea(ideaTargetData.id);
            dispatch(removeIdeas(ideaTargetData.id))
            dispatch(showAlert({ show: true, text: `${res.data}`, variant: 'success' }));
            dispatch(hideModal());
            dispatch(unSetIdea())
            handlerChangeEditor()
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error);
        }
    };

    async function sendQueryUpdata() {
        try {
            await IdeasService.updateIdea(ideaTargetData.id, title, text);
            dispatch(updateIdeas({ id: ideaTargetData.id, title, text, createdAt: 'now', updatedAt: 'now' }))
            dispatch(setIdea({ id: ideaTargetData.id, title, text, createdAt: 'now', updatedAt: 'now' }))
            dispatch(showAlert({ show: true, text: `Успешно обновлено`, variant: 'success' }));
            handlerChangeEditor()
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error)
        }
    }

    useEffect(() => {
        if (ideaTargetData.id !== 0) {
            setTitle(ideaTargetData.title);
            setText(ideaTargetData.text);
        }
    }, [ideaTargetData]);

    return (
        <>
            <section className='wrapper targetIdea mt-5 mb-5'>
                {ideaTargetData.id !== 0 ? (
                    isEditor ? (
                        <>
                            <Form className='wrapper'>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Введите загаловок</Form.Label>
                                    <Form.Control
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Введите загаловок"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Введите описание</Form.Label>
                                    <Form.Control
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Введите описание"
                                        as="textarea"
                                        rows={3}
                                    />
                                </Form.Group>
                            </Form>
                            <div className='d-flex justify-content-around'>
                                <CustomButton onClick={sendQueryUpdata} themeColor='Blue'>Сохронить</CustomButton>
                                <CustomButton onClick={handlerChangeEditor}>Отмена режима редактирования</CustomButton>
                                <CustomButton themeColor='Red' onClick={funShowModalDel}>Удалить элемент</CustomButton>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>{ideaTargetData.title}</h2>
                            <span>{new Date(ideaTargetData.updatedAt).toLocaleString()}</span>
                            <hr />
                            <p className='text-preWrap'>{ideaTargetData.text}</p>

                            {
                                authUser.role === "ADMIN" ?
                                    <CustomButton onClick={handlerChangeEditor}>Редактировать</CustomButton>
                                    :
                                    <></>
                            }
                        </>
                    )
                ) : (
                    <>
                        <h2>Добро пожаловать в список всех идей</h2>
                        <p className='text-center'>Выберите интересующую вас идею для подробного изучения</p>
                    </>
                )}
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

export default TargetIdeaComponent;

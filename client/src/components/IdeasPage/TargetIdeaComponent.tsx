import React, { useEffect, useState } from 'react';
import CustomButton from '../GeneralComponents/button/CustomButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Form } from 'react-bootstrap';
import IdeasService from '../../services/ideasService';
import { IDataIdeas } from '../../models/IDataIdeas';
import { ideaSlice } from '../../store/reducers/IdeaSlice';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { modalSlice } from '../../store/reducers/ModalSlice';
import MyModal from '../GeneralComponents/modal/MyModal';


interface TargetIdeaComponentProps {
    onUpdateIdea: (updatedIdea: IDataIdeas) => void;
}

const TargetIdeaComponent: React.FC<TargetIdeaComponentProps> = ({ onUpdateIdea }) => {
    const dispatch = useAppDispatch()
    const ideaTargetData = useAppSelector(state => state.IdeaSlice)
    const authUser = useAppSelector(state => state.AuthSlice)
    const { setIdea } = ideaSlice.actions
    const { showAlert } = alertSlice.actions
    const { showModal, hideModal } = modalSlice.actions

    const [isEditor, setIsEditor] = useState(false)
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");


    const handlerChangeEditor = () => {
        setIsEditor(prev => !prev)
    }

    // const funShowModalDel = (id: number) => {
    //     dispatch(showModal({ show: true, title: "Форма удаления", text: "Подтвердите удаление элемента", }));
    //     setIdForDeleted(id);
    // };
    // const sendQueryDelite = async (id: number) => {
    //     try {
    //         const res = await IdeasService.delIdea(id);
    //         setIdeasData(prev => prev.filter((item) => item.id !== id));
    //         dispatch(showAlert({ show: true, text: `${res.data}`, variant: 'success' }));
    //         dispatch(hideModal());
    //     } catch (error: any) {
    //         dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
    //         console.error(error);
    //     }
    // };

    async function sendQueryUpdata() {
        try {
            await IdeasService.updateIdea(ideaTargetData.id, title, text);
            onUpdateIdea({ id: ideaTargetData.id, title, text, updatedAt: 'now' });
            dispatch(setIdea({ id: ideaTargetData.id, title, text, updatedAt: 'now' }))
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
                                <CustomButton themeColor='Red'>Удалить элемент</CustomButton>

                            </div>
                        </>
                    ) : (
                        <>
                            <h2>{ideaTargetData.title}</h2>
                            <span>{new Date(ideaTargetData.updatedAt).toLocaleString()}</span>
                            <hr />
                            <p className='text-preWrap'>{ideaTargetData.text}</p>

                            {
                                authUser.role==="ADMIN" ?
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
                    {/* <CustomButton themeColor='Red' onClick={() => idForDeleted !== null && deletedIdeas(idForDeleted)}>Удалить</CustomButton> */}
                </div>
            </MyModal>
        </>
    );
};

export default TargetIdeaComponent;

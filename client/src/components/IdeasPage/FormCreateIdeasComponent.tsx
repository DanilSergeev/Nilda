import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';
import { useAppDispatch } from '../../hooks/redux';
import IdeasService from '../../services/ideasService';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { ideasSlice } from '../../store/reducers/IdeasSlice';



const FormCreateIdeasComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const { showAlert } = alertSlice.actions
    const { addIdea } = ideasSlice.actions

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");



    const sendDataCreate = async () => {
        try {
            const res = await IdeasService.createIdea(title, text);
            dispatch(showAlert({ show: true, text: `Элемент успешно создан`, variant: "success" }));
            dispatch(addIdea(res.idea))
        } catch (error: any) {
            console.error("Error object:", error);
            if (error?.response?.data?.message !== undefined) {
                dispatch(showAlert({ show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: "danger" }));
            } else {
                dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: "danger" }));
            }
        }
    };


    return (
        <section className='formCreateIdea mb-5'>
            <Form className='wrapper'>
                <Form.Group className="mb-3" >
                    <Form.Label>Введите загаловок</Form.Label>
                    <Form.Control
                        maxLength={255}
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
                <CustomButton type='button' onClick={sendDataCreate}>Создать</CustomButton>
            </Form>
        </section>
    );
};

export default FormCreateIdeasComponent;

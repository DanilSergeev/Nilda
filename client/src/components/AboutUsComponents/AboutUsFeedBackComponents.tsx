import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';
import { useState } from 'react';
import MailService from '../../services/mailService';
import { alertSlice } from '../../store/reducers/AlertSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';


const AboutUsFeedBackComponents = () => {
    const authUser = useAppSelector(state => state.AuthSlice)
    const dispatch = useAppDispatch()
    const { showAlert } = alertSlice.actions

    const [formData, setFormData] = useState({
        email: '',
        theme: '',
        message: '',
    });

    const validateForm = () => {
        if (!formData.email || !formData.theme || !formData.message) {
            dispatch(showAlert({ show: true, text: 'Все поля обязательны для заполнения', variant: 'danger' }));
            return false;
        }
        if (formData.theme.length < 2 || formData.message.length < 6) {
            dispatch(showAlert({ show: true, text: 'Тема сообщения должна содержать не менее 2 символов, а текст сообщения - не менее 6 символов', variant: 'danger' }));
            return false;
        }
        return true;
    };

    const sendMessage = async () => {
        if (!validateForm()) return;
        if (authUser.isAuth) {
            return dispatch(showAlert({ show: true, text: 'Пользователь не авторизован', variant: 'danger' }));;
        } 

        try {
            await MailService.sendMassage(formData.email, formData.theme, formData.message);
            dispatch(showAlert({ show: true, text: 'Сообщение отправлено', variant: 'success' }));
            setFormData({ email: '', theme: '', message: '' });
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: 'danger' }));
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="abputUsFeedBack wrapper ">
            <h2>Обратная связь</h2>
            <p>Поделитесь своим мыслями о книге</p>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Введите вашу почту</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Тема сообщения</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Тема сообщения (не менее 2 символов)"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Введите текст сообщения</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ваш текст (не менее 6 символов)"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </Form.Group>
                <CustomButton onClick={sendMessage} type="button">
                    Отправить
                </CustomButton>
            </Form>
        </section>
    );
};

export default AboutUsFeedBackComponents;
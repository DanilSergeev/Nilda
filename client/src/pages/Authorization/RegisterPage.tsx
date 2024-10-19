import CustomAlert from '../../components/GeneralComponents/alert/CustomAlert';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/GeneralComponents/button/CustomButton';
import { Link } from 'react-router-dom';
import CommonLine from '../../components/GeneralComponents/line/CommonLine';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { alertSlice } from '../../store/reducers/AlertSlice';
import AuthService from '../../services/authService';
import { IUser } from '../../models/IUser';


const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const { showAlert, hideAlert } = alertSlice.actions

    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const [dataAuth, setDataAuth] = useState<IUser>({
        email: '',
        name: '',
        password: '',
        rePassword: '',
        file: null,
    })
    const checkInputData = useCallback(() => {
        if (
            dataAuth.email &&
            dataAuth.name &&
            dataAuth.password &&
            dataAuth.rePassword
        ) {
            setButtonIsDisabled(false);
        } else {
            setButtonIsDisabled(true);
        }
    }, [dataAuth.email, dataAuth.name, dataAuth.password, dataAuth.rePassword]);


    const sendDataRegister = async () => {
        if (dataAuth.password !== dataAuth.rePassword) {
            return dispatch(showAlert({ show: true, text: `Ошибка при валидации - пароли не совподают`, variant: 'danger' }))
        }
        dispatch(hideAlert())
        try {
            const formData = new FormData();
            formData.append('email', dataAuth.email);
            formData.append('name', dataAuth.name);
            formData.append('password', dataAuth.password);
            formData.append('file', dataAuth.file as File);

            await AuthService.register(formData);
            dispatch(showAlert({ show: true, text: 'Объект успешно создан', variant: 'success' }))
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
        checkInputData();
    }, [checkInputData]);

    return (
        <>
            <main className="AuthPage ">
                <CommonLine title='Регистрация' text='Добро пожаловать в форму регистрации' />
                <div className='wrapper mt-5'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите вашу почту</Form.Label>
                            <Form.Control
                                type="email"
                                value={dataAuth.email}
                                onChange={e => setDataAuth(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="Введите вашу почту"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите ник</Form.Label>
                            <Form.Control
                                type="text"
                                value={dataAuth.name}
                                onChange={e => setDataAuth(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Введите ник"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Введите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={dataAuth.password}
                                onChange={e => setDataAuth(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Повторите пароль"
                                value={dataAuth.rePassword}
                                onChange={e => setDataAuth(prev => ({ ...prev, rePassword: e.target.value }))}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Вставте фото (не обязательно): </Form.Label>
                            <Form.Control
                                onChange={(e: any) => setDataAuth((prev) => ({ ...prev, file: e.target.files[0] }))}
                                type='file'
                            />
                        </Form.Group>

                        <CustomButton disabled={buttonIsDisabled} variant="primary" onClick={sendDataRegister}>
                            Отправить
                        </CustomButton>
                    </Form>
                    <Link to="/auth">Авторизация</Link>
                </div>
            </main>
            <CustomAlert />
        </>
    );
};
export default RegisterPage;
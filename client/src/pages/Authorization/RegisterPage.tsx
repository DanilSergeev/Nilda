import CustomAlert from '../../components/GeneralComponents/alert/CustomAlert';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/GeneralComponents/button/CustomButton';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CommonLine from '../../components/GeneralComponents/line/CommonLine';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { alertSlice } from '../../store/reducers/AlertSlice';
import AuthService from '../../services/authService';
import { IUserRegister } from '../../models/IUserRegister';


const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.AuthSlice)
    const { showAlert, hideAlert } = alertSlice.actions

    const navigate = useNavigate();
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const [dataAuth, setDataAuth] = useState<IUserRegister>({
        email: '',
        name: '',
        password: '',
        rePassword: '',
        file: undefined,
    })

    const handleChange = (field: keyof IUserRegister) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataAuth(prev => ({ ...prev, [field]: e.target.value }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setDataAuth(prev => ({ ...prev, file }));
    };


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

    const validateInputDataIsTrue = () => {
        const errors = [];
        if (dataAuth.password !== dataAuth.rePassword) {
            errors.push('пароли не совпадают');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataAuth.email)) {
            errors.push('не валидный email');
        }
        if (errors.length > 0) {
            dispatch(showAlert({ show: true, text: `Ошибка при валидации - ${errors.join(', ')}`, variant: 'danger' }));
            return false;
        }

        return true
    }

    const sendDataRegister = async () => {
        if (!validateInputDataIsTrue()) return;
        dispatch(hideAlert())
        try {
            const formData = new FormData();
            formData.append('email', dataAuth.email);
            formData.append('name', dataAuth.name);
            formData.append('password', dataAuth.password);
            formData.append('file', dataAuth.file as File);

            await AuthService.register(formData);
            dispatch(showAlert({ show: true, text: 'Подтвердите свою почту', variant: 'success' }))
            navigate("/auth");
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


    if (authUser.isAuth && authUser.isActivated) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <main className="AuthPage ">
                <CommonLine title='Регистрация' text='Добро пожаловать в форму регистрации' />
                <div className='wrapper mt-5'>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите вашу почту</Form.Label>
                            <Form.Control
                                type="email"
                                value={dataAuth.email}
                                onChange={handleChange("email")}
                                placeholder="Введите вашу почту"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите ник</Form.Label>
                            <Form.Control
                                maxLength={32}
                                type="text"
                                value={dataAuth.name}
                                onChange={handleChange("name")}
                                placeholder="Введите ник"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Введите пароль</Form.Label>
                            <Form.Control
                                maxLength={32}
                                type="password"
                                placeholder="Введите пароль"
                                value={dataAuth.password}
                                onChange={handleChange("password")}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control
                                maxLength={32}
                                type="password"
                                placeholder="Повторите пароль"
                                value={dataAuth.rePassword}
                                onChange={handleChange("rePassword")}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Вставте фото (не обязательно): </Form.Label>
                            <Form.Control
                                onChange={handleFileChange}
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
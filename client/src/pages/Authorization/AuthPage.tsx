import CustomAlert from '../../components/GeneralComponents/alert/CustomAlert';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/GeneralComponents/button/CustomButton';
import { Link, Navigate } from 'react-router-dom';
import CommonLine from '../../components/GeneralComponents/line/CommonLine';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { alertSlice } from '../../store/reducers/AlertSlice';
import AuthService from '../../services/authService';
import { authSlice } from '../../store/reducers/AuthSlice';



interface IUser {
    email: string,
    password: string,
}

const AuthPage = () => {
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.AuthSlice)
    const { showAlert, hideAlert } = alertSlice.actions
    const { setAuthUser } = authSlice.actions

    const [dataAuth, setDataAuth] = useState({
        email: '',
        password: '',
    })
    const handleChange = (field: keyof IUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataAuth(prev => ({ ...prev, [field]: e.target.value }));
    };


    const sendDataLogin = async () => {
        dispatch(hideAlert())
        try {
            const formData = new FormData();
            formData.append('email', dataAuth.email);
            formData.append('password', dataAuth.password);
            const response = await AuthService.login(formData);
            response.user.isActivated?
            dispatch(setAuthUser(response))
            :
            dispatch(showAlert({ show: true, text: `Подтвердите почту - ${authUser.email}`, variant: 'info' }))
        } catch (error: any) {
            console.error('Error object:', error);
            if (error?.response?.data?.message !== undefined) {
                dispatch(showAlert({ show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: 'danger' }))
            } else {
                dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }))
            }
        }
    }

    if (authUser.isAuth && authUser.isActivated) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <main className="AuthPage">
                <CommonLine title='Авторизация' text='Добро пожаловать в форму авторизации' />
                <div className='wrapper mt-5'>

                    <Form onSubmit={(e) => e.preventDefault()} className='wrapper mt-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите логин</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите логин"
                                value={dataAuth.email}
                                onChange={handleChange("email")}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Введите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={dataAuth.password}
                                onChange={handleChange("password")}
                            />
                        </Form.Group>

                        <CustomButton variant="primary" onClick={sendDataLogin} >
                            Отправить
                        </CustomButton>
                    </Form>
                    <Link to="/register">Регистрация</Link>
                </div>

            </main>
            <CustomAlert />
        </>
    );
};
export default AuthPage;
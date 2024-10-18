import CustomAlert from '../../components/GeneralComponents/alert/CustomAlert';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/GeneralComponents/button/CustomButton';
import { Link } from 'react-router-dom';
import CommonLine from '../../components/GeneralComponents/line/CommonLine';
import { useState } from 'react';



const RegisterPage = () => {
    const [dataAuth, setDataAuth] = useState({
        login: '',
        password: '',
        rePassword: ''
    })


    return (
        <>
            <main className="AuthPage ">
                <CommonLine title='Регистрация' text='Добро пожаловать в форму регистрации' />
                <div className='wrapper mt-5'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите логин</Form.Label>
                            <Form.Control
                                type="login"
                                value={dataAuth.login}
                                onChange={e => setDataAuth(prev => ({ ...prev, login: e.target.value }))}
                                placeholder="Введите логин"
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

                        <CustomButton variant="primary" >
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
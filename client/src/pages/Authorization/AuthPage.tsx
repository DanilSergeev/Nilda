import CustomAlert from '../../components/GeneralComponents/alert/CustomAlert';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/GeneralComponents/button/CustomButton';
import { Link } from 'react-router-dom';
import CommonLine from '../../components/GeneralComponents/line/CommonLine';
import { useState } from 'react';



const AuthPage = () => {
    const [dataAuth, setDataAuth] = useState({
        login: '',
        password: '',
    })

    return (
        <>
            <main className="AuthPage">
                <CommonLine title='Авторизация' text='Добро пожаловать в форму авторизации' />
                <div className='wrapper mt-5'>

                    <Form className='wrapper mt-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите логин</Form.Label>
                            <Form.Control
                                type="login"
                                placeholder="Введите логин"
                                value={dataAuth.login}
                                onChange={e => setDataAuth(prev => ({ ...prev, login: e.target.value }))}
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

                        <CustomButton variant="primary" >
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
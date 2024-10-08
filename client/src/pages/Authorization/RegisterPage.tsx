import CustomAlert from '../../components/GeneralComponents/alert/CustomAlert';
import Form from 'react-bootstrap/Form';
import CustomButton from '../../components/GeneralComponents/button/CustomButton';
import { Link } from 'react-router-dom';
import CommonLine from '../../components/GeneralComponents/line/CommonLine';



const RegisterPage = () => {

    return (
        <>
            <main className="AuthPage ">
                <CommonLine title='Регистрация' text='Добро пожаловать в форму регистрации' />
                <div className='wrapper mt-5'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Введите логин</Form.Label>
                            <Form.Control type="login" placeholder="Enter login" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Введите пароль</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control type="password" placeholder="Repeat the password" />
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
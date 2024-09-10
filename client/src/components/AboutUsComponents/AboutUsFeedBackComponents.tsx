import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';
import { useState } from 'react';
import MailService from '../../services/mailService';


const AboutUsFeedBackComponents = () => {
    const [email, setEmail] = useState<string>('')
    const [theam, setTheam] = useState<string>('')
    const [message, setMessage] = useState<string>('')


    const sendMessage = async () => {
        try {
            const res = await MailService.sendMassage(email, theam, message)
            console.log(res)
        } catch (error) {
            console.error(error)            
        }
    }

    return (
        <section className='abputUsFeedBack wrapper'>
            <h2>Обратная связь</h2>
            <p>Поделитесь своим мыслями о книге</p>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Ввдите вашу почту</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(() => e.target.value)} type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Тема сообщения</Form.Label>
                    <Form.Control value={theam} onChange={(e) => setTheam(() => e.target.value)} placeholder='Тема сообщения' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Введите текст сообщения</Form.Label>
                    <Form.Control value={message} onChange={(e) => setMessage(() => e.target.value)} as="textarea" rows={3} placeholder='Ваш текст' />
                </Form.Group>
                <CustomButton onClick={() => sendMessage()} type='button'>Отправить</CustomButton>
            </Form>
        </section>

    )
}

export default AboutUsFeedBackComponents
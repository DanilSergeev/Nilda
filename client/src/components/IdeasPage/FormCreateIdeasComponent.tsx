import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';


interface FormCreateIdeasProps {
    onSubmit: (title: string, text: string) => void;
}

const FormCreateIdeasComponent: React.FC<FormCreateIdeasProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");


    const handleSubmit = () => {
        onSubmit(title, text);
        setTitle("");
        setText("");
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
                <CustomButton type='button' onClick={handleSubmit}>Создать</CustomButton>
            </Form>
        </section>
    );
};

export default FormCreateIdeasComponent;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IdeasService from '../services/ideasService';
import CustomButton from '../components/GeneralComponents/button/CustomButton';
import MyModal from '../components/GeneralComponents/modal/MyModal';
import Alert from 'react-bootstrap/Alert';
import ListIdeasComponent from '../components/IdeasPage/listIdeasComponent';
import FormCreateIdeasComponent from '../components/IdeasPage/FormCreateIdeasComponent';

interface IDataIdeas {
    id: number;
    title: string;
    text: string;
    updatedAt: string;
}

const IdeasPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [ideasData, setIdeasData] = useState<IDataIdeas[]>([]);
    const [showModalDel, setShowModalDel] = useState(false);
    const [idForDeleted, setIdForDeleted] = useState<number | null>(null);
    const [alertSetting, setAlertSetting] = useState({
        variant: 'success',
        show: false,
        text: ''
    });

    const funShowModalDel = (id: number) => {
        setShowModalDel(true);
        setIdForDeleted(id);
    };
    const deletedIdeas = async (id: number) => {
        try {
            const res = await IdeasService.delIdea(id);
            setIdeasData(prev => prev.filter((item) => item.id !== id));
            setAlertSetting({ show: true, text: `${res.data}`, variant: 'success' });
            setShowModalDel(false);
        } catch (error: any) {
            setAlertSetting({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' });
            console.error(error);
        }
    };
    const getIdeas = async () => {
        try {
            const response = await IdeasService.getIdeas();
            setIdeasData(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке идей:', error);
        }
    };
    const sendDataCreate = async (title: string, text: string) => {
        setAlertSetting(prev => ({ ...prev, show: false }));
        try {
            const res = await IdeasService.createIdea(title, text);
            console.log(res);
            setAlertSetting(prev => ({ ...prev, show: true, text: `Идея успешно создана`, variant: "success" }));
            setIdeasData(prev => ([...prev, { id: res.idea.id, title: res.idea.title, text: res.idea.text, updatedAt: res.idea.updatedAt }]));
        } catch (error: any) {
            console.error("Error object:", error);
            if (error?.response?.data?.message !== undefined) {
                setAlertSetting(prev => ({ ...prev, show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: "danger" }));
            } else {
                setAlertSetting(prev => ({ ...prev, show: true, text: `Ошибка - ${error?.message}`, variant: "danger" }));
            }
        }
    };

    useEffect(() => {
        getIdeas();
    }, []);


    return (
        <>
            <main>
                <section className='targetIdea'>

                </section>
                <FormCreateIdeasComponent onSubmit={sendDataCreate} />
                <ListIdeasComponent ideasData={ideasData} onDeleteClick={funShowModalDel} />
            </main>

            <MyModal modalActiv={showModalDel} setModalActiv={setShowModalDel}>
                <h3>Форма удаления</h3>
                <hr className='mb-4' />
                <p>Подтвердите удаление элемента</p>
                <div className='d-flex justify-content-between mt-4'>
                    <CustomButton onClick={() => setShowModalDel(false)}>Отмена</CustomButton>
                    <CustomButton themeColor='Red' onClick={() => idForDeleted !== null && deletedIdeas(idForDeleted)}>Удалить</CustomButton>
                </div>
            </MyModal>
            <Alert show={alertSetting.show} variant={alertSetting.variant} onClick={() => setAlertSetting(prev => ({ ...prev, show: false }))}>
                {alertSetting.text}
            </Alert>
        </>
    );
};

export default IdeasPage;

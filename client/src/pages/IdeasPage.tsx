import React, { useEffect, useState } from 'react';
import IdeasService from '../services/ideasService';
import CustomButton from '../components/GeneralComponents/button/CustomButton';
import MyModal from '../components/GeneralComponents/modal/MyModal';
import ListIdeasComponent from '../components/IdeasPage/listIdeasComponent';
import FormCreateIdeasComponent from '../components/IdeasPage/FormCreateIdeasComponent';
import TargetIdeaComponent from '../components/IdeasPage/TargetIdeaComponent';
import { IDataIdeas } from '../models/IDataIdeas';
import { alertSlice } from '../store/reducers/AlertSlice';
import { useAppDispatch } from '../hooks/redux';
import CustomAlert from '../components/GeneralComponents/alert/CustomAlert';

const IdeasPage: React.FC = () => {
    const {showAlert,hideAlert} = alertSlice.actions
    const dispatch = useAppDispatch()
    const [ideasData, setIdeasData] = useState<IDataIdeas[]>([]);
    const [ideaTargetData, setIdeaTargetData] = useState<IDataIdeas>();
    const [showModalDel, setShowModalDel] = useState(false);
    const [idForDeleted, setIdForDeleted] = useState<number | null>(null);

    const funShowModalDel = (id: number) => {
        setShowModalDel(true);
        setIdForDeleted(id);
    };
    const deletedIdeas = async (id: number) => {
        try {
            const res = await IdeasService.delIdea(id);
            setIdeasData(prev => prev.filter((item) => item.id !== id));
            dispatch(showAlert({ show: true, text: `${res.data}`, variant: 'success' }));
            setShowModalDel(false);
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
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
        dispatch(hideAlert());
        try {
            const res = await IdeasService.createIdea(title, text);
            console.log(res);
            dispatch(showAlert({show:true,  text: `Идея успешно создана`, variant: "success" }));
            setIdeasData(prev => ([...prev, { id: res.idea.id, title: res.idea.title, text: res.idea.text, updatedAt: res.idea.updatedAt }]));
        } catch (error: any) {
            console.error("Error object:", error);
            if (error?.response?.data?.message !== undefined) {
                dispatch(showAlert({show:true,  text: `Ошибка - ${error?.response?.data?.message}`, variant: "danger" }));
            } else {
                dispatch(showAlert({show:true,  text: `Ошибка - ${error?.message}`, variant: "danger" }));
            }
        }
    };

    useEffect(() => {
        getIdeas();
    }, []);

    const featchDataTargetIdea = async (id: number) => {
        const data = await IdeasService.getIdea(id) as { data: IDataIdeas };
        setIdeaTargetData(data.data)
    };

    return (
        <>
            <main>
                <TargetIdeaComponent ideaTargetData={ideaTargetData} />
                <FormCreateIdeasComponent onSubmit={sendDataCreate} />
                <ListIdeasComponent ideasData={ideasData} onTargetClick={featchDataTargetIdea} onDeleteClick={funShowModalDel} />
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
            <CustomAlert/>
        </>
    );
};

export default IdeasPage;
import React, { useEffect, useState } from 'react';
import IdeasService from '../services/ideasService';
import CustomButton from '../components/GeneralComponents/button/CustomButton';
import MyModal from '../components/GeneralComponents/modal/MyModal';
import ListIdeasComponent from '../components/IdeasPage/listIdeasComponent';
import FormCreateIdeasComponent from '../components/IdeasPage/FormCreateIdeasComponent';
import TargetIdeaComponent from '../components/IdeasPage/TargetIdeaComponent';
import { IDataIdeas } from '../models/IDataIdeas';
import { alertSlice } from '../store/reducers/AlertSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import CustomAlert from '../components/GeneralComponents/alert/CustomAlert';
import { modalSlice } from '../store/reducers/ModalSlice';

const IdeasPage: React.FC = () => {
    const authUser = useAppSelector(state => state.AuthSlice)
    const { showAlert, hideAlert } = alertSlice.actions
    const { showModal, hideModal } = modalSlice.actions
    const dispatch = useAppDispatch()

    const [ideasData, setIdeasData] = useState<IDataIdeas[]>([]);
    const [ideaTargetData, setIdeaTargetData] = useState<IDataIdeas>();
    const [idForDeleted, setIdForDeleted] = useState<number | null>(null);

    const featchDataTargetIdea = async (id: number) => {
        const data = await IdeasService.getIdea(id) as { data: IDataIdeas };
        setIdeaTargetData(data.data)
    };

    const featchIdeas = async () => {
        try {
            const response = await IdeasService.getIdeas();
            setIdeasData(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке идей:', error);
        }
    };

    const funShowModalDel = (id: number) => {
        dispatch(showModal({ show: true, title: "Форма удаления", text: "Подтвердите удаление элемента", }));
        setIdForDeleted(id);
    };

    const deletedIdeas = async (id: number) => {
        try {
            const res = await IdeasService.delIdea(id);
            setIdeasData(prev => prev.filter((item) => item.id !== id));
            dispatch(showAlert({ show: true, text: `${res.data}`, variant: 'success' }));
            dispatch(hideModal());
        } catch (error: any) {
            dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: 'danger' }));
            console.error(error);
        }
    };

    const sendDataCreate = async (title: string, text: string) => {
        dispatch(hideAlert());
        try {
            const res = await IdeasService.createIdea(title, text);
            console.log(res);
            dispatch(showAlert({ show: true, text: `Идея успешно создана`, variant: "success" }));
            setIdeasData(prev => ([...prev, { id: res.idea.id, title: res.idea.title, text: res.idea.text, updatedAt: res.idea.updatedAt }]));
        } catch (error: any) {
            console.error("Error object:", error);
            if (error?.response?.data?.message !== undefined) {
                dispatch(showAlert({ show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: "danger" }));
            } else {
                dispatch(showAlert({ show: true, text: `Ошибка - ${error?.message}`, variant: "danger" }));
            }
        }
    };

    useEffect(() => {
        featchIdeas();
    }, []);

    return (
        <>
            <main>
                <TargetIdeaComponent ideaTargetData={ideaTargetData} />
                {
                    authUser.role === "ADMIN" ?
                        <FormCreateIdeasComponent onSubmit={sendDataCreate} />
                        :
                        <></>
                }
                <ListIdeasComponent ideasData={ideasData} onTargetClick={featchDataTargetIdea} onDeleteClick={funShowModalDel} />
            </main>
            <MyModal>
                <div className='d-flex justify-content-between mt-4'>
                    <CustomButton onClick={() => dispatch(hideModal())}>Отмена</CustomButton>
                    <CustomButton themeColor='Red' onClick={() => idForDeleted !== null && deletedIdeas(idForDeleted)}>Удалить</CustomButton>
                </div>
            </MyModal>
            <CustomAlert />
        </>
    );
};

export default IdeasPage;
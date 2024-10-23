import React, { useEffect, useState } from 'react';
import IdeasService from '../services/ideasService';
import ListIdeasComponent from '../components/IdeasPage/listIdeasComponent';
import FormCreateIdeasComponent from '../components/IdeasPage/FormCreateIdeasComponent';
import TargetIdeaComponent from '../components/IdeasPage/TargetIdeaComponent';
import { IDataIdeas } from '../models/IDataIdeas';
import { alertSlice } from '../store/reducers/AlertSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import CustomAlert from '../components/GeneralComponents/alert/CustomAlert';
import { ideaSlice } from '../store/reducers/IdeaSlice';

const IdeasPage: React.FC = () => {
    const authUser = useAppSelector(state => state.AuthSlice)
    const { showAlert, hideAlert } = alertSlice.actions
    const { setIdea } = ideaSlice.actions
    const dispatch = useAppDispatch()

    const [ideasData, setIdeasData] = useState<IDataIdeas[]>([]);

    const featchDataTargetIdea = async (id: number) => {
        const data = await IdeasService.getIdea(id) as { data: IDataIdeas };
        dispatch(setIdea(data.data))
    };

    const featchIdeas = async () => {
        try {
            const response = await IdeasService.getIdeas();
            setIdeasData(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке идей:', error);
        }
    };

    const updateIdeaInList = (updatedIdea: IDataIdeas) => {
        setIdeasData(prev => prev.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea));
    };

    const sendDataCreate = async (title: string, text: string) => {
        dispatch(hideAlert());
        try {
            const res = await IdeasService.createIdea(title, text);
            dispatch(showAlert({ show: true, text: `Элемент успешно создан`, variant: "success" }));
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
                <TargetIdeaComponent onUpdateIdea={updateIdeaInList} />
                {
                    authUser.role === "ADMIN" ?
                        <FormCreateIdeasComponent onSubmit={sendDataCreate} />
                        :
                        <></>
                }
                <ListIdeasComponent ideasData={ideasData} onTargetClick={featchDataTargetIdea} />
            </main>
            <CustomAlert />
        </>
    );
};

export default IdeasPage;
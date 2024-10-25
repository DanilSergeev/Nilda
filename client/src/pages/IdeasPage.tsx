import React from 'react';
import ListIdeasComponent from '../components/IdeasPage/listIdeasComponent';
import FormCreateIdeasComponent from '../components/IdeasPage/FormCreateIdeasComponent';
import TargetIdeaComponent from '../components/IdeasPage/TargetIdeaComponent';
import { useAppSelector } from '../hooks/redux';
import CustomAlert from '../components/GeneralComponents/alert/CustomAlert';

const IdeasPage: React.FC = () => {
    const authUser = useAppSelector(state => state.AuthSlice)

    return (
        <>
            <main>
                <TargetIdeaComponent />
                {
                    authUser.role === "ADMIN" ?
                        <FormCreateIdeasComponent />
                        :
                        <></>
                }
                <ListIdeasComponent />
            </main>
            <CustomAlert />
        </>
    );
};

export default IdeasPage;
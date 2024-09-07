import React from 'react';


interface ITargetIdeaComponentProps {
    ideaTargetData: IDataIdea | undefined;
}
interface IDataIdea {
    id: number;
    title: string;
    text: string;
    updatedAt: string;
}
const TargetIdeaComponent: React.FC<ITargetIdeaComponentProps> = ({ ideaTargetData }) => {
    return (
        <section className='wrapper targetIdea mt-5 mb-5'>
            {
                ideaTargetData ?
                    <>
                        <h2>{ideaTargetData.title}</h2>
                        <span>{new Date(ideaTargetData.updatedAt).toLocaleString()}</span>
                        <hr />
                        <p className='text-preWrap'>{ideaTargetData.text}</p>
                    </>
                    :
                    <>
                        <h2>Добро пожаловать в список всех идей</h2>
                        <p className='text-center'>Выберете интересующую вас идею для подробного изучения</p>
                    </>
            }
        </section>
    );
};

export default TargetIdeaComponent;

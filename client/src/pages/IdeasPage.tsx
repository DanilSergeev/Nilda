import { useParams } from 'react-router-dom';
import IdeasService from '../services/ideasService';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomButton from '../components/GeneralComponents/button/CustomButton';
import MyModal from '../components/GeneralComponents/modal/MyModal';
import Alert from 'react-bootstrap/Alert';


interface IDataIdeas {
    id: number,
    title: string,
    text: string,
    updatedAt: string,
}

const IdeasPage = () => {
    const { id } = useParams();
    const [ideasData, setIdeasData] = useState<IDataIdeas[]>([]);

    const [showModalDel, setShowModalDel] = useState(true);
    let [idForDeleted, setIdForDeleted] = useState<number>(-1);


    const funShowModalDel = (id: number) => {
        setShowModalDel(true);
        setIdForDeleted(id)
    };





    const deletedIdeas = async (id: number) => {
        try {
            await IdeasService.delIdea(id)
            setIdeasData(pre => pre.filter((item) => item.id !== id))
        } catch (error) {
            console.error(error)
        }
    }
    const getIdeas = async () => {
        try {
            const response = await IdeasService.getIdeas()
            setIdeasData(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getIdeas()
    }, [id])


    return (
        <>
            <main >
                <section className='listIdeas'>
                    <ListGroup className='wrapper' as="ol" numbered>
                        {
                            ideasData.map(item => (
                                <ListGroup.Item key={item.id} as="li" className="d-flex justify-content-between">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{item.title}</div>
                                        {item.text}
                                    </div>
                                    <div className='ButtonsListIdeas'>
                                        <CustomButton>Подробнее</CustomButton>
                                        <CustomButton themColor='Red' onClick={() => funShowModalDel(item.id)}>Удалить</CustomButton>
                                    </div>
                                </ListGroup.Item>
                            ))
                        }

                    </ListGroup>
                </section>
            </main>

            <MyModal modalActiv={showModalDel} setModalActiv={setShowModalDel}>
                <h3>Форма удаления</h3>
                <hr className='mb-4' />
                <p>Подтвердите удаление элемента</p>
                <div className='d-flex justify-content-between mt-4'>
                    <CustomButton onClick={() => setShowModalDel(false)}>Отмена</CustomButton>
                    <CustomButton themColor='Red' onClick={() => deletedIdeas(idForDeleted)}>Удалить</CustomButton>
                </div>
            </MyModal>
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see ydou</Alert.Heading>
                <p>
                    Aww yeah, you successfully read this important alert message. This
                    example text is going to run a bit longer so that you can see how
                    spacing within an alert works with this kind of content.
                </p>
            </Alert>
        </>
    )
}

export default IdeasPage
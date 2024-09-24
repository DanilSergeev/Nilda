import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from '../GeneralComponents/button/CustomButton';
import AuxiliaryDataServic from '../../services/auxiliaryDataService';
import DataItemService from '../../services/dataItemService';


interface ICatrgoryAndCountry {
    id: number,
    name: string
}
interface IDataInput {
    title: string,
    text: string,
    category: number,
    country: number,
    file: any
}

const FormCreateHeroesOrItemsComponent: React.FC = () => {
    const [categorys, setCategorys] = useState<ICatrgoryAndCountry[]>([{
        id: 0,
        name: ''
    }]);
    const [countrys, setCountrys] = useState<ICatrgoryAndCountry[]>([{
        id: 0,
        name: ''
    }]);
    const [inputData, setInputData] = useState<IDataInput>({
        title: '',
        text: '',
        category: 0,
        country: 0,
        file: null
    })

    const fetchCategorysAndCountrys = async () => {
        try {
            const [categories, countries] = await Promise.all([
                AuxiliaryDataServic.getCategorys(),
                AuxiliaryDataServic.getCountrys()
            ]);
    
            setCategorys(categories.data);
            setCountrys(countries.data);
        } catch (error: any) {
            // setError(error.message || 'Ошибка при получении данных элемента');
            throw error;
        }
    };

    useEffect(() => {
        fetchCategorysAndCountrys()

    }, [])

    const sendDataCreate = async () => {
        // setAlertSetting(prev => ({ ...prev, show: false }));
        try {
            let formData = new FormData()
            formData.append("title", inputData.title)
            formData.append("description", inputData.text)
            formData.append("categoryId", inputData.category.toString())
            formData.append("countryId", inputData.country.toString())
            formData.append("file", inputData.file)


            const res = await DataItemService.creatItem(
                formData
            )
            console.log(res)
            //     const res = await IdeasService.createIdea(title, text);
            //     console.log(res);
            //     setAlertSetting(prev => ({ ...prev, show: true, text: `Идея успешно создана`, variant: "success" }));
            //     setIdeasData(prev => ([...prev, { id: res.idea.id, title: res.idea.title, text: res.idea.text, updatedAt: res.idea.updatedAt }]));
        } catch (error: any) {
            console.error("Error object:", error);
            //     if (error?.response?.data?.message !== undefined) {
            //         setAlertSetting(prev => ({ ...prev, show: true, text: `Ошибка - ${error?.response?.data?.message}`, variant: "danger" }));
            //     } else {
            //         setAlertSetting(prev => ({ ...prev, show: true, text: `Ошибка - ${error?.message}`, variant: "danger" }));
            //     }
        }
    };



    return (
        <section className='mb-5'>
            <Form className='wrapper'>
                <Form.Group className="mb-3" >
                    <Form.Label>Введите название</Form.Label>
                    <Form.Control
                        maxLength={255}
                        value={inputData?.title}
                        onChange={(e) => setInputData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Введите название"
                    />
                </Form.Group>

                <Form.Select onChange={(e) => setInputData(prev => ({ ...prev, category: Number(e.target.value) }))} className='mb-3' defaultValue={""} aria-label="Default select" >
                    <option value="" disabled>Выберите категорию</option>
                    {categorys.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}

                </Form.Select>

                <Form.Select onChange={(e) => setInputData(prev => ({ ...prev, countrys: Number(e.target.value) }))} className='mb-3' defaultValue={""} aria-label="Default select" >
                    <option value="" disabled>Выберите страну</option>
                    {countrys.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </Form.Select>

                <Form.Group className="mb-3" >
                    <Form.Label>Введите описание</Form.Label>
                    <Form.Control
                        value={inputData?.text}
                        onChange={(e) => setInputData(prev => ({ ...prev, text: e.target.value }))}
                        placeholder="Введите описание"
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Вставте фото: </Form.Label>
                    <Form.Control onChange={(e: any) => setInputData(prev => ({ ...prev, file: e.target.files[0] }))} type="file" />
                </Form.Group>
                <CustomButton type='button' onClick={sendDataCreate}>Создать</CustomButton>
            </Form>
        </section>
    );
};

export default FormCreateHeroesOrItemsComponent;

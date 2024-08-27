import ddd from '../../assets/img/ddd.jpg';
// import { Link } from 'react-router-dom';
// import CustomButton from '../GeneralComponents/button/CustomButton';


const LocationHomeComponents = () => {
    return (
        <section  >
            <div className="" style={{ backgroundImage: `url(${ddd})` }}>
                <h2>Локации</h2>
                <h6>Места, которые играют роль в истории</h6>
                
                <div className="wrapper  cardLocation">
                    <h3>Деревня Золотого Солнца</h3>
                    <p>В сердце величественной долины, где солнечные лучи золотят поля и леса, расположилась деревня Золотого Солнца. Эта небольшая, но процветающая община известна своей гостеприимностью и уникальными традициями. </p>
                </div>
               

            </div>
        </section>
    )
}

export default LocationHomeComponents
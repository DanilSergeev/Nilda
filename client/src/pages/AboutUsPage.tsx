import CustomButton from '../components/GeneralComponents/button/CustomButton';
import { Link } from 'react-router-dom';
import AboutUsFeedBackComponents from '../components/AboutUsComponents/AboutUsFeedBackComponents';


const AboutUsPage = () => {
    return (

        <main>
            <section className='wrapper'>
                <h1>Загаловок</h1>
                <p>Под загаловок</p>
                <CustomButton><a target="_blank" rel='noreferrer' href={`${process.env.REACT_APP_LINK_TO_BOOK}`} className='a-colorUnset'  >Предпросмотер книги</a></CustomButton>
            </section>
            <section className='abputUsSotial wrapper'>
                <h2>Связь с автором</h2>
                <p>Соц. сети</p>
                <div>
                    <Link to="/">sd</Link>
                    <Link to="/">sd</Link>
                    <Link to="/">sd</Link>
                </div>
            </section>
            <AboutUsFeedBackComponents/>

            {/* <section className='interactiveMap'></section>
            На будущие */}
        </main>
    )
}

export default AboutUsPage
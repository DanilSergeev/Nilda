import CustomButton from '../GeneralComponents/button/CustomButton';

const AboutUsWelcomComponents = () => {
    return (
        <section className='aboutUsWelcom mb-5'>
        <div className='wrapper'>
            <h1>Предпросмотр книги</h1>
            <p>Нажмите на кнопку ниже, чтобы перейти на страницу предпросмотра книги.</p>
            <CustomButton><a target="_blank" rel='noreferrer' href={`${process.env.REACT_APP_LINK_TO_BOOK}`} className='a-colorUnset'  >Предпросмотер книги</a></CustomButton>
        </div>
    </section>
    );
};

export default AboutUsWelcomComponents;
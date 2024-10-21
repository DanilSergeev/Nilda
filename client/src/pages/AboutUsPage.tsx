import AboutUsFeedBackComponents from '../components/AboutUsComponents/AboutUsFeedBackComponents';
import AboutUsSotialComponents from '../components/AboutUsComponents/AboutUsSotialComponents';
import AboutUsWelcomComponents from '../components/AboutUsComponents/AboutUsWelcomComponents';
import CustomAlert from '../components/GeneralComponents/alert/CustomAlert';


const AboutUsPage = () => {
    return (
        <>
            <main>
                <AboutUsWelcomComponents />
                <AboutUsSotialComponents />
                <AboutUsFeedBackComponents />
                {/* <section className='interactiveMap'></section>
            На будущие */}
            </main>
            <CustomAlert />
        </>
    )
}

export default AboutUsPage
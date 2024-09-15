import AboutUsFeedBackComponents from '../components/AboutUsComponents/AboutUsFeedBackComponents';
import AboutUsSotialComponents from '../components/AboutUsComponents/AboutUsSotialComponents';
import AboutUsWelcomComponents from '../components/AboutUsComponents/AboutUsWelcomComponents';


const AboutUsPage = () => {
    return (

        <main>
            <AboutUsWelcomComponents/>
            <AboutUsSotialComponents />
            <AboutUsFeedBackComponents />
            {/* <section className='interactiveMap'></section>
            На будущие */}
        </main>
    )
}

export default AboutUsPage
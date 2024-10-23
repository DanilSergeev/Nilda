import CustomButton from '../GeneralComponents/button/CustomButton';
import { Link } from 'react-router-dom';


const WelcomeHomeComponents = () => {
    return (
        <section className='WelcomeHomeComponents'>
            <CustomButton><Link to="/aboutUs" className='a-colorUnset'>История</Link></CustomButton>
        </section>
    )
}

export default WelcomeHomeComponents
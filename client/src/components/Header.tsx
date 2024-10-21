import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/AuthSlice';




const Header = () => {
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.AuthSlice)
    const {logout} = authSlice.actions

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function logoutFunction() {
        try {
            await dispatch(logout())
            handleClose()
        } catch (error) {
            console.error(error)            
        }

    }

    return (
        <>
            <header>
                <button onClick={() => handleShow()} />
            </header>
            <Offcanvas placement='end' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><Link to="/" onClick={() => handleClose()} className='headerLink'>{`${process.env.REACT_APP_TITLE_PROJECT}`}</Link></Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body >
                    <Link to="/" onClick={() => handleClose()} className='headerLink'>Главная</Link>
                    <Link to="/aboutUs" onClick={() => handleClose()} className='headerLink'>О проекте</Link>
                    <Link to="/ideas" onClick={() => handleClose()} className='headerLink'>Идеи</Link>
                    <Link to="/itemsById/1/id/0" onClick={() => handleClose()} className='headerLink'>Персонажи</Link>
                    <Link to="/itemsById/2/id/0" onClick={() => handleClose()} className='headerLink'>Предметы</Link>
                    <hr />
                    {
                        authUser.isAuth?
                        <Link to="/" onClick={() => logoutFunction()} className='headerLink mt-2'>Выйти из {authUser.email}</Link>
                        :
                        <Link to="/auth" onClick={() => handleClose()} className='headerLink mt-2'>Авторизация</Link>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header
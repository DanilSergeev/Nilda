import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';




const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <header>
                <button onClick={() => handleShow()} />
            </header>
            <Offcanvas placement='end' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><Link to="/" className='headerLink'>{`${process.env.REACT_APP_TITLE_PROJECT}`}</Link></Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body >
                    <Link to="/" className='headerLink'>Главная</Link>
                    <Link to="/aboutUs" className='headerLink'>О проекте</Link>
                    <Link to="/ideas" className='headerLink'>Идеи</Link>
                    <Link to="/itemsById/1/id/0" className='headerLink'>Персонажи</Link>
                    <Link to="/itemsById/2/id/0" className='headerLink'>Предметы</Link>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header
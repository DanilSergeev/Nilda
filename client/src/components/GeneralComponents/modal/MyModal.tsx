import { FC, ReactNode } from 'react';
import classes from './MyModal.module.css';

interface Imodal {
    modalActiv: boolean;
    setModalActiv: (value: boolean) => void;
    children: ReactNode;
}

const MyModal: FC<Imodal> = ({ modalActiv, setModalActiv, children }) => {
    const rootClasses = [classes.modal];
    if (modalActiv) {
        rootClasses.push(classes.activ);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setModalActiv(false)}>
            <div className={classes.modalWindow} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
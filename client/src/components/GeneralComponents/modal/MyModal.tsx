import { FC, PropsWithChildren } from 'react';
import classes from './MyModal.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { modalSlice } from '../../../store/reducers/ModalSlice';


const MyModal: FC<PropsWithChildren> = ({ children }) => {
    const modalSetting = useAppSelector(state => state.ModalSlice)
    const { hideModal } = modalSlice.actions
    const dispatch = useAppDispatch()

    const rootClasses = [classes.modal];
    if (modalSetting.show) {
        rootClasses.push(classes.activ);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => dispatch(hideModal())}>
            <div className={classes.modalWindow} onClick={(e) => e.stopPropagation()}>
                <h3>{modalSetting.title}</h3>
                <hr className='mb-4' />
                <p>{modalSetting.text}</p>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
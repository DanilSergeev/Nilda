import Alert from 'react-bootstrap/Alert';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { alertSlice } from '../../../store/reducers/AlertSlice';

const CustomAlert: FC = () => {
    const alertSetting = useAppSelector(state => state.AlertSlice)
    const {hideAlert} = alertSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (alertSetting.show) {
          setTimeout(() => {
            dispatch(hideAlert());
          }, 5000);
        }
      }, [alertSetting.show, dispatch, hideAlert]);


    return (
        <Alert show={alertSetting.show} variant={alertSetting.variant} onClick={() => dispatch(hideAlert())}>
            {alertSetting.text}
        </Alert>
    )
}

export default CustomAlert;
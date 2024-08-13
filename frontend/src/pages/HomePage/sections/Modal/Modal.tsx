/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import sass from "./Modal.module.scss";
import { LogInForm } from '../../../LogInPage/components';
import { useAppDispatch, useAppState } from '../../../../hooks';
import { setHomeModal } from '../../../../redux/store';
import { useNavigate } from 'react-router-dom';


export default function Modal() {
    const navigation = useNavigate()
    const dispatch = useAppDispatch();
	const { authenticate } = useAppState();
    
    useEffect(()=>{
        if(authenticate.isLoggedIn) {
            dispatch(setHomeModal(false));
        }
    },[authenticate.isLoggedIn])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(setHomeModal(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
    

    const handleClick = () => {
        dispatch(setHomeModal(false));
    }

    return (
        <div className={sass.container} onClick={handleClick}>
            <div className={sass.form} onClick={(e)=> e.stopPropagation()}>
                <LogInForm />
                <button onClick={()=>navigation('sign-up')} className={sass.button}>Registration </button>
            </div>
        </div>
    )
}

import ReactDOM from 'react-dom'

import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import '../styles/Toast.css'


const Toast = ({setToastActive, children}) => {

    const el = document.getElementById('root')

    return ReactDOM.createPortal(
        <div className="toast__content" onClick={e => e.stopPropagation()}>
            {children}
            <IconButton 
                onClick={() => setToastActive(false)}
                color='inherit'
                size='small'
            >
                <Close/>
            </IconButton>
        </div>,
        el
    );
}

export default Toast
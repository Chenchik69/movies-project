import ReactDOM from 'react-dom'

import { IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

import '../styles/Modal.css'


const Modal = (props) => {
    console.log(props)
    const el = document.getElementById('root')

    return ReactDOM.createPortal(
        <div className="modal__content" onClick={e => e.stopPropagation()}>
            {props.children}
            <IconButton 
                onClick={() => props.setModalActive(false)}
                color='inherit'
                size='small'
            >
                <Close/>
            </IconButton>
            <Button variant='outlined' onClick={() => props.setAllow(false)}>Cancel</Button>
            <Button variant='contained' onClick={() => props.removeMovie()}>Confirm</Button>
        </div>,
        el
    );
}

export default Modal

// сделать модалку

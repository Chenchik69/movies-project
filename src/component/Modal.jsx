import ReactDOM from 'react-dom'

import { IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

import '../styles/Modal.css'


const Modal = (props) => {
    const element = document.getElementById('root')

    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="close-wrapper">
                    <IconButton 
                        onClick={() => props.setModalActive(false)}
                        color='inherit'
                        size='small'
                    >
                        <Close/>
                    </IconButton>
                </div>
                <span className="modal-text">{props.children}</span>
                <div className="button-wrapper">
                    <Button variant='outlined' onClick={() => props.setAllow(false)} size='small'>Cancel</Button>
                    <Button variant='contained' onClick={() => props.removeMovie()} size='small'>Confirm</Button>
                </div>
            </div>
        </div>,
        element
    );
}

export default Modal

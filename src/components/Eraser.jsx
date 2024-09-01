import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const Eraser = () => {
    const { eraser, setEraser } = useContext(CollaborationContext);

    return (
        <button onClick={() => setEraser(!eraser)}>
            {eraser ? 'Disable Eraser' : 'Enable Eraser'}
        </button>
    );
};

export default Eraser;

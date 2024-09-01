import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const UndoRedo = () => {
    const { undo, redo } = useContext(CollaborationContext);

    return (
        <>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </>
    );
};

export default UndoRedo;

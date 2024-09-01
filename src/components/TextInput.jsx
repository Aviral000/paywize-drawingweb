import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const TextInput = () => {
    const { setText } = useContext(CollaborationContext);

    return (
        <input
            type="text"
            placeholder="Enter text"
            onChange={(e) => setText(e.target.value)}
        />
    );
};

export default TextInput;

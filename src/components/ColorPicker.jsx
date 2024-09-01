import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const ColorPicker = () => {
    const { setColor } = useContext(CollaborationContext);

    return (
        <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
        />
    );
};

export default ColorPicker;

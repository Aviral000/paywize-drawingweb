import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const BrushSizeSelector = () => {
    const { setBrushSize } = useContext(CollaborationContext);

    return (
        <select onChange={(e) => setBrushSize(e.target.value)}>
            <option value="2">Small</option>
            <option value="5">Medium</option>
            <option value="10">Large</option>
        </select>
    );
};

export default BrushSizeSelector;

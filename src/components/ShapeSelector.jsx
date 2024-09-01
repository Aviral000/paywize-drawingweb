import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const ShapeSelector = () => {
    const { setShape } = useContext(CollaborationContext);

    return (
        <select onChange={(e) => setShape(e.target.value)}>
            <option value="freehand">Freehand</option>
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
        </select>
    );
};

export default ShapeSelector;

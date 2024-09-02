import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';
import useCanvas from '../hooks/useCanvas';

const PresetShapes = ({ canvasRef }) => {
    const { color, brushSize } = useContext(CollaborationContext);
    const { draw, clearCanvas } = useCanvas(canvasRef);

    const addSquare = () => {
        draw(100, 100, 200, 200, { shape: 'rectangle', color, brushSize });
    };

    const addCircle = () => {
        draw(300, 300, 350, 350, { shape: 'circle', color, brushSize });
    };

    const addLine = () => {
        draw(50, 50, 250, 250, { shape: 'line', color, brushSize });
    };

    return (
        <div>
            <button onClick={addSquare}>Add Square</button>
            <button onClick={addCircle}>Add Circle</button>
            <button onClick={addLine}>Add Line</button>
            <button onClick={clearCanvas}>Clear Canvas</button>
        </div>
    );
};

export default PresetShapes;
import React from 'react';
import ColorPicker from './ColorPicker';
import BrushSizeSelector from './BrushSizeSelector';
import ShapeSelector from './ShapeSelector';
import TextInput from './TextInput';
import Eraser from './Eraser';
import UndoRedo from './UndoRedo';

const Toolbar = ({ canvasRef }) => {
    return (
        <div className="toolbar">
            <ColorPicker />
            <BrushSizeSelector />
            <ShapeSelector />
            <TextInput canvasRef={canvasRef} />
            <Eraser />
            <UndoRedo />
        </div>
    );
};

export default Toolbar;

import React from 'react';
import ColorPicker from './ColorPicker';
import BrushSizeSelector from './BrushSizeSelector';
import ShapeSelector from './ShapeSelector';
import TextInput from './TextInput';
import Eraser from './Eraser';
import UndoRedo from './UndoRedo';

const Toolbar = () => {
    return (
        <div className="toolbar">
            <ColorPicker />
            <BrushSizeSelector />
            <ShapeSelector />
            <TextInput />
            <Eraser />
            <UndoRedo />
        </div>
    );
};

export default Toolbar;

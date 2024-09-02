import React, { useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';

const TextInput = ({ canvasRef }) => {
    const { text, setText, textFont, setTextFont, textSize, setTextSize, color, setColor } = useContext(CollaborationContext);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTextInput();
        }
    };

    const handleTextInput = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        context.fillStyle = color;
        context.font = `${textSize}px ${textFont}`;
        context.fillText(text, 50, 50);
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
                onKeyDown={handleKeyDown}
            />
            <select value={textFont} onChange={(e) => setTextFont(e.target.value)}>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
            </select>
            <input
                type="number"
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                min="8"
                max="72"
            />
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export default TextInput;

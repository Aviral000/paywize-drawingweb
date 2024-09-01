import { useCallback, useState, useContext, useEffect } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';
import { updateCollaborators } from '../services/collaborationService';

const useCanvas = (canvasRef) => {
    const { color, brushSize, shape, text, eraser, addToHistory } = useContext(CollaborationContext);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const scale = window.devicePixelRatio || 1;
        canvas.width = 800 * scale;
        canvas.height = 600 * scale;
        canvas.style.width = '800px';
        canvas.style.height = '600px';
        context.scale(scale, scale);
        context.fillStyle = "#fff";
        context.fillRect(0, 0, 800, 600);
    }, [canvasRef]);

    const draw = useCallback((context) => {
        context.fillStyle = "#fff";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, []);

    const getMousePos = (canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
    
        return {
            x: (event.clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
            y: (event.clientY - rect.top) * scaleY / (window.devicePixelRatio || 1)
        };
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { x, y } = getMousePos(canvas, e.nativeEvent);
        setIsDrawing(true);
        setStartX(x);
        setStartY(y);
    
        if (eraser) {
            erase(x, y, context);
        } else if (shape === 'text' && text) {
            context.fillStyle = color;
            context.font = `${brushSize * 5}px Arial`;
            context.fillText(text, x, y);
            addToHistory('text', { text, x, y, color, brushSize });
        }
    };
    
    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { x, y } = getMousePos(canvas, e.nativeEvent);

        if (eraser) {
            erase(x, y, context);
        } else if (isDrawing && shape === 'freehand') {
            context.strokeStyle = color;
            context.lineWidth = brushSize;
            context.lineJoin = 'round';
            context.lineCap = 'round';

            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(x, y);
            context.stroke();

            addToHistory('draw', { x1: startX, y1: startY, x2: x, y2: y, color, brushSize });

            setStartX(x);
            setStartY(y);

            updateCollaborators('draw', { x1: startX, y1: startY, x2: x, y2: y, color, brushSize });
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const erase = (x, y, context) => {
        const eraserSize = brushSize * 10;
        context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
        addToHistory('erase', { x, y, size: eraserSize });
        updateCollaborators('erase', { x, y, size: eraserSize });
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return { draw, clearCanvas, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useCanvas;

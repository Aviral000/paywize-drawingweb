import { useCallback, useState, useContext, useEffect, useRef } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';
import { updateCollaborators } from '../services/collaborationService';

const useCanvas = (canvasRef) => {
    const { color, brushSize, shape, text, eraser, addToHistory } = useContext(CollaborationContext);
    const [isDrawing, setIsDrawing] = useState(false);
    const startPosRef = useRef({ x: 0, y: 0 });

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

    const getMousePos = useCallback((canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
    
        return {
            x: (event.clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
            y: (event.clientY - rect.top) * scaleY / (window.devicePixelRatio || 1)
        };
    }, []);

    const draw = useCallback((startX, startY, endX, endY, options = {}) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { color: drawColor = color, brushSize: drawBrushSize = brushSize, shape: drawShape = shape } = options;

        context.strokeStyle = drawColor;
        context.lineWidth = drawBrushSize;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.beginPath();

        switch (drawShape) {
            case 'freehand':
                context.moveTo(startX, startY);
                context.lineTo(endX, endY);
                break;
            case 'line':
                context.moveTo(startX, startY);
                context.lineTo(endX, endY);
                break;
            case 'rectangle':
                context.rect(startX, startY, endX - startX, endY - startY);
                break;
            case 'circle':
                const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                context.arc(startX, startY, radius, 0, 2 * Math.PI);
                break;
            case 'text':
                context.fillStyle = drawColor;
                context.font = `${drawBrushSize * 5}px Arial`;
                context.fillText(options.text || text, endX, endY);
                break;
        }

        if (drawShape !== 'text') {
            context.stroke();
        }

        addToHistory('draw', { x1: startX, y1: startY, x2: endX, y2: endY, color: drawColor, brushSize: drawBrushSize, shape: drawShape, text: options.text });
        updateCollaborators('draw', { x1: startX, y1: startY, x2: endX, y2: endY, color: drawColor, brushSize: drawBrushSize, shape: drawShape, text: options.text });
    }, [color, brushSize, shape, text, addToHistory]);

    const handleMouseDown = useCallback((e) => {
        const canvas = canvasRef.current;
        const { x, y } = getMousePos(canvas, e);
        setIsDrawing(true);
        startPosRef.current = { x, y };

        if (eraser) {
            erase(x, y);
        } else if (shape === 'text') {
            draw(x, y, x, y, { shape: 'text' });
        }
    }, [getMousePos, eraser, shape, draw]);

    const handleMouseMove = useCallback((e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const { x, y } = getMousePos(canvas, e);

        if (eraser) {
            erase(x, y);
        } else if (shape === 'freehand') {
            draw(startPosRef.current.x, startPosRef.current.y, x, y);
            startPosRef.current = { x, y };
        }
    }, [isDrawing, getMousePos, eraser, shape, draw]);

    const handleMouseUp = useCallback((e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const { x, y } = getMousePos(canvas, e);

        if (!eraser && shape !== 'freehand' && shape !== 'text') {
            draw(startPosRef.current.x, startPosRef.current.y, x, y);
        }

        setIsDrawing(false);
    }, [isDrawing, getMousePos, eraser, shape, draw]);

    const erase = useCallback((x, y) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const eraserSize = brushSize * 10;
        context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
        addToHistory('erase', { x, y, size: eraserSize });
        updateCollaborators('erase', { x, y, size: eraserSize });
    }, [brushSize, addToHistory]);

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        addToHistory('clear');
        updateCollaborators('clear');
    }, [addToHistory]);

    return { draw, clearCanvas, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useCanvas;
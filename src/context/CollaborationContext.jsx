import React, { createContext, useState, useEffect } from 'react';
import { listenForUpdates } from '../services/collaborationService';

export const CollaborationContext = createContext();

export const CollaborationProvider = ({ children }) => {
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(2);
    const [shape, setShape] = useState('freehand');
    const [text, setText] = useState('');
    const [eraser, setEraser] = useState(false);
    const [collaborators, setCollaborators] = useState([]);

    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const addToHistory = (action, data) => {
        setHistory([...history, { action, data }]);
        setRedoStack([]);
    };

    const updateCollaborator = (collaboratorId, position) => {
        setCollaborators(prevCollaborators => {
            const existingCollaborator = prevCollaborators.find(c => c.id === collaboratorId);
            if (existingCollaborator) {
                return prevCollaborators.map(c =>
                    c.id === collaboratorId ? { ...c, position } : c
                );
            } else {
                return [...prevCollaborators, { id: collaboratorId, position }];
            }
        });
    };


    const undo = () => {
        if (history.length > 0) {
            const lastAction = history[history.length - 1];
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setRedoStack([lastAction, ...redoStack]);

            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            newHistory.forEach(({ action, data }) => {
                performAction(action, data, context);
            });
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const nextAction = redoStack[0];
            const newRedoStack = redoStack.slice(1);
            setRedoStack(newRedoStack);
            setHistory([...history, nextAction]);

            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('2d');
            performAction(nextAction.action, nextAction.data, context);
        }
    };

    const performAction = (action, data, context) => {
        if (action === 'draw') {
            context.strokeStyle = data.color;
            context.lineWidth = data.brushSize;
            context.lineJoin = 'round';
            context.lineCap = 'round';

            context.beginPath();
            context.moveTo(data.x1, data.y1);
            context.lineTo(data.x2, data.y2);
            context.stroke();
        } else if (action === 'erase') {
            context.clearRect(data.x, data.y, data.size, data.size);
        } else if (action === 'text') {
            context.fillStyle = data.color;
            context.font = `${data.brushSize * 5}px Arial`;
            context.fillText(data.text, data.x, data.y);
        }
    };

    useEffect(() => {
        listenForUpdates((action, data) => {
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('2d');
            performAction(action, data, context);
            addToHistory(action, data);
        });
    }, []);

    return (
        <CollaborationContext.Provider value={{
            color, setColor,
            brushSize, setBrushSize,
            shape, setShape,
            text, setText,
            eraser, setEraser,
            undo, redo,
            addToHistory,
            collaborators, setCollaborators, updateCollaborator
        }}>
            {children}
        </CollaborationContext.Provider>
    );
};

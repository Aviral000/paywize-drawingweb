import React, { useRef, useEffect, useContext } from 'react';
import { CollaborationContext } from '../context/CollaborationContext';
import useCanvas from '../hooks/useCanvas';

const Canvas = () => {
    const canvasRef = useRef(null);
    const { draw, handleMouseDown, handleMouseMove, handleMouseUp } = useCanvas(canvasRef);
    const { collaborators } = useContext(CollaborationContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context);
    }, [draw]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                className="canvas"
                width={800}
                height={600}
                style={{ width: '800px', height: '600px', border: '1px solid black' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
            {collaborators.map(collab => (
                <div
                    key={collab.id}
                    style={{
                        position: 'absolute',
                        left: collab.position.x,
                        top: collab.position.y,
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        pointerEvents: 'none'
                    }}
                ></div>
            ))}
        </div>
    );
};

export default Canvas;

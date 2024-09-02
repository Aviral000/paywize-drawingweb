import React, { useRef } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import { CollaborationProvider } from './context/CollaborationContext';
import './assets/styles/App.css';

function App() {
    const canvasRef = useRef(null);

    return (
        <CollaborationProvider>
            <div className="App">
                <Toolbar canvasRef={canvasRef} />
                <Canvas />
            </div>
        </CollaborationProvider>
    );
}

export default App;

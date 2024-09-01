import React from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import { CollaborationProvider } from './context/CollaborationContext';
import './assets/styles/App.css';

function App() {
    return (
        <CollaborationProvider>
            <div className="App">
                <Toolbar />
                <Canvas />
            </div>
        </CollaborationProvider>
    );
}

export default App;

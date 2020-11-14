import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

function App() {
    return (
        <div className="app">
            <div className="app_body">
                {/* Sidebar */}
                <Sidebar />
                {/* Chat Screen */}
                <Chat />
            </div>
        </div>
    );
}

export default App;

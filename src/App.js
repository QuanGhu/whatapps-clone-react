import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar'

function App() {
    return (
        <div className="app">
            <div className="app_body">
                {/* Sidebar */}
                <Sidebar />
                {/* Chat Screen */}
            </div>
        </div>
    );
}

export default App;

import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <div className="app_body">
                <Router>
                    <Sidebar />
                    <Switch>
                        <Route path="/" exact>
                            <Chat />
                        </Route>
                        <Route path="/room/:roomId">
                            <Chat />
                        </Route>
                        
                    </Switch>
                </Router>
                
            </div>
        </div>
    );
}

export default App;

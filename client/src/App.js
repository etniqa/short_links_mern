import React from 'react';
import 'materialize-css'
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";

function App() {
    const {login, logout, token, userId} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{
            // here we assign global vars
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                {/*check if user isAuthenticated and show Navbar custom component*/}
                {isAuthenticated && <Navbar/>}
                <div
                    className="container"
                >
                    {/*inside of div.container there is rendering all pages*/}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;

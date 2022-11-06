import React, { createContext, useState, useEffect, useRef } from 'react';
import AuthService from '../Services/AuthService';
import AgentService from '../Services/AgentService';
export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            // setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
            AgentService.getAgents().then((data1) => {
              for (const agent of data1.agents){
                if(agent.email==data.user.email){
                    setUser(agent)
                    setIsAdmin(true);
                    break;
                }
              }
            });
        });
    }, []);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}
import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext();
export const isAuthTokenContext = createContext();
export const addProfieResponseContext = createContext();
export const profileupdatecontext = createContext();


function ContextShare({ children }) {
    // children is a predefined props used to share data between components
    //create a state that need to be shared
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)
    const [addProfieResponse, setAddProfieResponse] = useState({})

    return (
        <>
            <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
                    <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                        <addProfieResponseContext.Provider value={{ addProfieResponse, setAddProfieResponse }}>
                                {children}
                        </addProfieResponseContext.Provider>
                    </isAuthTokenContext.Provider>
                </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare;
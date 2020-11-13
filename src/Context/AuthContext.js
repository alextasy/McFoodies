import React, { useState } from 'react'

export const AuthContext = React.createContext({
    isAuth: false,
    setIsAuth: ()=>{},
    userInfo: {},
    setUserInfo: ()=>{},
    userID: null,
    setUserID: ()=>{}
})

const AuthContextProvider = (props)=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInformation, setUserInformation] = useState(false);
    const [userIDState, setUserIDState] = useState(null);

    return(
        <AuthContext.Provider value={{
            isAuth: isAuthenticated, setIsAuth: setIsAuthenticated,
            userInfo: userInformation, setUserInfo: setUserInformation,
            userID: userIDState, setUserID: setUserIDState
         }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
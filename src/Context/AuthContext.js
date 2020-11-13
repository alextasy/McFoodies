import React, { useState } from 'react'

export const AuthContext = React.createContext({
    isAuth: false,
    setIsAuth: ()=>{},
    userInfo: {},
    setUserInfo: ()=>{}
})

const AuthContextProvider = (props)=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInformation, setUserInformation] = useState(false);

    return(
        <AuthContext.Provider value={{
            isAuth: isAuthenticated, setIsAuth: setIsAuthenticated,
            userInfo: userInformation, setUserInfo: setUserInformation
         }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
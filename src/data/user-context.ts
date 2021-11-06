import React from 'react'

export interface User{
    name: string;
    email: string;
    token: string;
}

const UserContext = React.createContext<{
    token: string;
    storeToken: (token: string) => void;
    initContext: () => void,
}>({
    token: '',
    storeToken: () => {},
    initContext: () => {}
})

export default UserContext
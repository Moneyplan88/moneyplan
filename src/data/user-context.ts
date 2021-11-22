import React from 'react'
import UserModel from '../model/user.model'

const UserContext = React.createContext<{
    token: string;
    user: UserModel
    storeToken: (token: string) => void;
    initContext: () => void,
    fetchInfo: () => void,
}>({
    token: '',
    user: {},
    storeToken: () => {},
    initContext: () => {},
    fetchInfo: () => {},
})

export default UserContext
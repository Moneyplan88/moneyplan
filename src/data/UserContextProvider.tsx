import React, { useCallback, useEffect, useState } from 'react'
import UserContext from './user-context'
import { Storage } from '@capacitor/storage';

const UserContextProvider: React.FC = props => {
    const [token, setToken] = useState('')

    const storeToken = (token: string) => {
        console.log(token)
        setToken(token)
    }

    const initContext = useCallback( async () => {
        const result = await Storage.get({key: 'token'})
        const tokenRes = result.value ? JSON.parse(result.value) : ''
        console.info("initing ... ",tokenRes)
        setToken(tokenRes)
    },[])

    useEffect(() => {
        Storage.set({key: 'token',value: JSON.stringify(token)})
    }, [token])

    return (
        <UserContext.Provider value={{token, storeToken, initContext}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
import React from 'react'
import UserModel from '../model/user.model'
import Wallet from '../model/wallet.model'

const UserContext = React.createContext<{
    token: string,
    user: UserModel,
    wallet: Wallet[],
    storeToken: (token: string) => void;
    initContext: () => void,
    fetchInfo: () => void,
    fetchWallet: () => void,
}>({
    token: '',
    user: {},
    wallet: [],
    storeToken: () => {},
    initContext: () => {},
    fetchInfo: () => {},
    fetchWallet: () => {},
})

export default UserContext
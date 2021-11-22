import React from 'react'
import UserModel from '../model/user.model'
import Wallet from '../model/wallet.model'

const UserContext = React.createContext<{
    token: string,
    user: UserModel,
    wallet: Wallet[],
    totalBalance: number,
    storeToken: (token: string) => void;
    initContext: () => void,
    fetchInfo: () => void,
    fetchWallet: () => void,
    fetchAllBalance: () => void,
}>({
    token: '',
    user: {},
    wallet: [],
    totalBalance: 0,
    storeToken: () => {},
    initContext: () => {},
    fetchInfo: () => {},
    fetchWallet: () => {},
    fetchAllBalance: () => {},
})

export default UserContext
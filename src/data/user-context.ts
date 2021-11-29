import React from 'react'
import Category from '../model/categories.model'
import UserModel from '../model/user.model'
import Wallet from '../model/wallet.model'

const UserContext = React.createContext<{
    token: string,
    user: UserModel,
    wallet: Wallet[],
    totalBalance: number,
    categories: Category[],
    storeToken: (token: string) => void;
    initContext: () => void,
    fetchInfo: () => void,
    fetchWallet: () => void,
    fetchAllBalance: () => void,
    fetchAllCategory: () => void,
    getToken: () => any
}>({
    token: '',
    user: {},
    wallet: [],
    totalBalance: 0,
    categories: [],
    storeToken: () => {},
    initContext: () => {},
    fetchInfo: () => {},
    fetchWallet: () => {},
    fetchAllBalance: () => {},
    fetchAllCategory: () => {},
    getToken: () => {return ""}
})

export default UserContext
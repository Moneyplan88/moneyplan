import React from 'react'
import Category from '../model/categories.model'
import UserModel from '../model/user.model'
import Wallet from '../model/wallet.model'
import transaction from '../model/transaction.model'

const UserContext = React.createContext<{
    token: string,
    user: UserModel,
    wallet: Wallet[],
    totalBalance: number,
    totalWallets: number,
    transaction: transaction[],
    categories: Category[],
    storeToken: (token: string) => void;
    initContext: () => void,
    fetchInfo: () => void,
    fetchWallet: () => void,
    fetchAllBalance: () => void,
    fetchAllCategory: () => void,
    getToken: () => any
    fetchTransaction: () => void,
    logoutUser: () => void,
}>({
    token: '',
    user: {},
    wallet: [],
    totalBalance: 0,
    totalWallets: 0,
    categories: [],
    transaction: [],
    storeToken: () => {},
    initContext: () => {},
    fetchInfo: () => {},
    fetchWallet: () => {},
    fetchAllBalance: () => {},
    fetchAllCategory: () => {},
    getToken: () => {return ""},
    fetchTransaction: () => {},
    logoutUser: () => {},
})

export default UserContext
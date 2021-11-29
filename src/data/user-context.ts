import React from 'react'
import Category from '../model/categories.model'
import UserModel from '../model/user.model'
import Wallet from '../model/wallet.model'
import transaction from '../model/income.model'

const UserContext = React.createContext<{
    token: string,
    user: UserModel,
    wallet: Wallet[],
    totalBalance: number,
    transaction: transaction[],
    categories: Category[],
    storeToken: (token: string) => void;
    initContext: () => void,
    fetchInfo: () => void,
    fetchWallet: () => void,
    fetchAllBalance: () => void,
    fetchAllCategory: () => void,
    fetchTransaction: () => void,
    logoutUser: () => void,
}>({
    token: '',
    user: {},
    wallet: [],
    totalBalance: 0,
    categories: [],
    transaction: [],
    storeToken: () => {},
    initContext: () => {},
    fetchInfo: () => {},
    fetchWallet: () => {},
    fetchAllBalance: () => {},
    fetchAllCategory: () => {},
    fetchTransaction: () => {},
    logoutUser: () => {},
})

export default UserContext
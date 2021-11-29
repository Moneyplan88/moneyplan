import React, { useCallback, useEffect, useState } from 'react'
import UserContext from './user-context'
import { Storage } from '@capacitor/storage'
import axios from 'axios'
import { urlCategoryList, urlTransactionList, urlUserInfo, urlWalletList, urlWalletTotal } from './Urls'
import UserModel from '../model/user.model'

const UserContextProvider: React.FC = (props) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [wallet, setWallet] = useState([])
  const [transaction, setTransaction] = useState([])
  const [categories, setCategories] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)

  const storeToken = (token: string) => {
    console.log(token)
    setToken(token)
  }

  const fetchInfo = async () => {
    console.log(token)
    await axios.get(urlUserInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(val => {
      const userInfo: UserModel = val.data.data
      setUser(userInfo)
      console.info(userInfo)
    }).catch(err => {
      console.log("error: "+err)
      // Set back token to null since token is invalid
      setToken('')
    }) 
  }

  const fetchWallet = async () => {
    await axios.get(urlWalletList, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(val => {
      console.info(val.data.data)
      setWallet(val.data.data)
    }).catch(err => {
      console.log("error: "+err)
    }) 
  }

  
  const fetchTransaction = async () => {
    await axios.get(urlTransactionList,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(val => {
      console.info(val.data)
      setTransaction(val.data.data)
    }).catch(err => {
      console.log("error fetch trx: "+err)
    }) 
  }

  const fetchAllBalance = async () => {
    await axios.get(urlWalletTotal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(val => {
      console.info(val.data)
      setTotalBalance(val.data.data.total_balance)
    }).catch(err => {
      console.log("error: "+err)
    }) 
  }

  const fetchAllCategory = async () => {
    await axios.get(urlCategoryList).then(val => {
      console.info(val.data)
      setCategories(val.data.data)
    }).catch(err => {
      console.log("error: "+err)
    }) 
  }

  const logoutUser = () => {
    setToken('')
  }

  const initContext = useCallback(async () => {
    const result = await Storage.get({ key: 'token' })
    const tokenRes = result.value ? JSON.parse(result.value) : ''
    console.info('initing ... ', tokenRes)
    setToken(tokenRes)

    if (tokenRes != '') {
      await axios.get(urlUserInfo, {
        headers: {
          Authorization: `Bearer ${tokenRes}`,
        },
      }).then(val => {
        const userInfo: UserModel = val.data.data
        setUser(userInfo)
        console.info(userInfo)
      }).catch(err => {
        console.log("error: "+err)
        // Set back token to null since token is invalid
        setToken('')
      }) 
    }
  }, [])

  useEffect(() => {
    Storage.set({ key: 'token', value: JSON.stringify(token) })
  }, [token])

  return (
    <UserContext.Provider value={{ token, 
      user, 
      wallet,
      transaction,
      totalBalance, 
      categories,
      storeToken, 
      initContext, 
      fetchInfo,
      fetchTransaction, 
      fetchWallet,
      fetchAllBalance,
      fetchAllCategory, 
      logoutUser,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

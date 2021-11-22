import React, { useCallback, useEffect, useState } from 'react'
import UserContext from './user-context'
import { Storage } from '@capacitor/storage'
import axios from 'axios'
import { urlUserInfo } from './Urls'
import UserModel from '../model/user.model'

const UserContextProvider: React.FC = (props) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

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

  const initContext = useCallback(async () => {
    const result = await Storage.get({ key: 'token' })
    const tokenRes = result.value ? JSON.parse(result.value) : ''
    console.info('initing ... ', tokenRes)
    setToken(tokenRes)

    if (result.value) {
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
    <UserContext.Provider value={{ token, user, storeToken, initContext, fetchInfo }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

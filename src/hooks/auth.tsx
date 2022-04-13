import React, { createContext, useContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import { api } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CLIENT_ID = '68d3e43d5396f3c31247'
const SCOPE = 'read:user'
const USER_STORAGE = '@dowhile:user'
const TOKEN_STORAGE = '@dowhile:token'

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthResponse = { 
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  
  async function signIn() {
    try {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post<AuthResponse>('/authenticate', { code: authSessionResponse.params.code })
        const { user, token } = authResponse.data

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token))

        setUser(user)
      }

      setIsSigningIn(false)
    } catch(error) {
      console.log(error)
    } finally {
      setIsSigningIn(false)
    }
  }
  
  async function signOut() {

  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

      if(userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        
        setUser(JSON.parse(userStorage))
      }

      setIsSigningIn(false)
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigningIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
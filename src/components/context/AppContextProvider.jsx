import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';


export const AppContext = createContext()

export function AppContextProvider ({children}) {
  const [token, setToken] = useState(() => {
    const tokenLS = localStorage.getItem('token')
    return tokenLS || ''
  })


  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])

  return (
    <AppContext.Provider value={{token, setToken}}>
      {children}
    </AppContext.Provider>
  )
}

import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const MainUserContext = React.createContext()

export function useMainUser() {
  return useContext(MainUserContext)
}

export function MainUserProvider({ children }) {
  const [mainUser, setMainUser] = useLocalStorage('mainUser', {});

  return (
    <MainUserContext.Provider value={{ mainUser, setMainUser }}>
      {children}
    </MainUserContext.Provider>
  )
}

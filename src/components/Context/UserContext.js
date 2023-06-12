import { createContext, useContext, useState } from 'react';
import {collection, getDoc, getFirestore, query, where} from 'firebase/firestore';
const UserContext = createContext([])

export const useUserContext = () => useContext(UserContext)

function UserContextProvider ({children}){
    const [User, setUser] = useState()
    const getUser = ({password, mail}) => {
        const db = getFirestore()
        const queryUsers = collection (db, 'Users')
        const queryUsersFilter = query(queryUsers, where ('mail', '==', mail), where('password', '==', password))
        getDoc (queryUsersFilter)
        console.log (queryUsersFilter)
    }
  return (
    <UserContext.Provider value ={{getUser}}>
    {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider

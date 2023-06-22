import { createContext, useContext } from 'react';
import {collection, getDoc, getFirestore, query, where} from 'firebase/firestore';
const UserContext = createContext([])

export const useUserContext = () => useContext(UserContext)

function UserContextProvider ({children}){
    const getUser = ({password, mail}) => {
        const db = getFirestore()
        const queryUsers = collection (db, 'Users')
        const queryUsersFilter = query(queryUsers, where ('mail', '==', mail), where('password', '==', password))
        getDoc (queryUsersFilter)
    }
  return (
    <UserContext.Provider value ={{getUser}}>
    {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider
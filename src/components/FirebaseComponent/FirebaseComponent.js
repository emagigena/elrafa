import { useEffect } from "react"
import {collection, doc, getDocs } from "firebase/firestore"
import { db } from "../utils/firebase"

export const FirebaseComponent = ()=>{


    useEffect(()=>{
        const getData = async() =>{
            const query = collection(db, "items");
            const response = await getDocs(query);

            const dataItems = response.docs.map(doc=>{return{id: doc.id,...doc.data()}});
            console.log("dataItems", dataItems);
        }
        getData();
    },[])

    return(
        <h>Firebase Component</h>

    )
}
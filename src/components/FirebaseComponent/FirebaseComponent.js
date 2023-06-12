import { useEffect } from "react"
import {collection, doc, getDocs } from "firebase/firestore"
import { db } from "../utils/firebase"

export const FirebaseComponent = ()=>{
   

    useEffect(()=>{
        const getData = async() =>{
            //segun el profe, la referencia en la base de datos de la info que quiero obetener
            const query = collection(db, "items");
            const response = await getDocs(query);
            console.log("info-documento",response.docs[0].data());
            console.log("respuesta", response);
            console.log("id-documento",response.doc[0].id);
            //const newDoc={
            //    id:doc.id,
            //    title: "jash"
            //    precio: 3000
            //    ...
            //}

            const dataItems = response.docs.map(doc=>{return{id: doc.id,...doc.data()}});
            console.log("dataItems", dataItems);
        }
        getData();
    },[])

    return(
        <h>Firebase Component</h>

    )
}
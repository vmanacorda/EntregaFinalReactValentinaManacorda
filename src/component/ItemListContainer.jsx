import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Item from "./Item"; 
import { app } from "../../firebaseconfig"; 
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";

const ItemListContainer = () => {

  const [resultado, setResultado] = useState([])
  const params = useParams()

  useEffect(() => {

      const db = getFirestore(app)
      const productosCollection = collection(db, "productos")

      let miConsulta;

      if (params.id === undefined) {
          
          miConsulta = getDocs(productosCollection)
      } else {
          
          const miFiltro = query(productosCollection, where("category", "==", params.id))
          miConsulta = getDocs(miFiltro)
      }

      miConsulta
          .then((respuesta) => {

              setResultado(respuesta.docs.map((doc) => {
                 
                  const productoData = doc.data()
                  productoData.id = doc.id
                  return productoData
              }))
          })
          .catch(() => {
          })
      
  }, [params.id])

  return (
      <div className="fluid-grid">
          {resultado.map((producto) => {
              return (
                  <Item
                      key={producto.id}
                      producto={producto}
                  />
              )
          })}
      </div>
  )
}
export default ItemListContainer

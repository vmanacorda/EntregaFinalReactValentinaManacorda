import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { carritoContexto } from "./Carritocontext" 
import toast from "react-hot-toast"
import { addDoc, collection, getDocs, getFirestore, query, where, getDoc, doc } from "firebase/firestore"
import { app } from "../../firebaseconfig"

const ProductDetailContainer = () => {

    const [producto, setProducto] = useState({})
    const params = useParams()
    const valor = useContext(carritoContexto)

    useEffect(() => {

        const db = getFirestore(app)
        const productosCollection = collection(db, "productos")
        const miFiltro = doc(productosCollection, params.id)
        const miConsulta = getDoc(miFiltro)

        miConsulta
            .then((respuesta) => {
                console.log(respuesta.data())
                setProducto(respuesta.data())
            })
            .catch(() => {
                console.log("Salio todo mal")
            })
    }, [])

    const handleClick = async () => {
        const productoCarrito = producto
        productoCarrito.cantidad = 1
        productoCarrito.userId = "1234567890"

        const db = getFirestore(app)
        const carritoCollection = collection(db, "carrito")
        const miConsulta = addDoc(carritoCollection, productoCarrito)

        miConsulta
            .then(() => {
                
                valor.handleAgregar(producto)
                toast.success("Producto agregado al carrito")
            })
            .catch(() => {
                
            })
    }

    return (
        <div className="flex-grow product-detail">
            <h2 className="product-card__descriptionprice">{producto.title} </h2>
            <img src={producto.thumbnail} alt={producto.title} />
            <h2 className="product-card__descriptionprice">${producto.price} </h2>
            <p className="product-card__description">{producto.description}</p>
            <button className="buttonagregaralcarrito" onClick={handleClick}>Agregar al carrito</button>
        </div>
    )
}

export default ProductDetailContainer

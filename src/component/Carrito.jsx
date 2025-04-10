import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { carritoContexto } from "./Carritocontext";
import { useContext } from "react";
import Formulario from "./Formulario";
import { app } from "../../firebaseconfig";
import toast from "react-hot-toast";

const Carrito = () => {
    const valor = useContext(carritoContexto);
    const { handleEliminar } = valor; 

    const handleClick = () => {
        const nuevoProducto = {
            category: "muebles",
            description: "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
            id: 11,
            price: 1899.99,
            thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
            title: "Annibale Colombo Bed"
        };

        const db = getFirestore(app);
        const productosCollection = collection(db, "productos");
        const miConsulta = addDoc(productosCollection, nuevoProducto);

        miConsulta
            .then(() => {
                toast.success("Producto agregado a la base de datos");
            })
            .catch(() => {
                });
    };

    const handleClickTraer = () => {
        const db = getFirestore(app);
        const productosCollection = collection(db, "productos");
        const query = getDocs(productosCollection);

        query
            .then((resultadoDeLaConsulta) => {
                })
            .catch(() => {
             });
    };

    const handleUploadProducts = () => {
        
        fetch("/productos.json")
            .then((response) => response.json())
            .then((productos) => {
                const db = getFirestore(app);
                const productosCollection = collection(db, "productos");

                productos.forEach((producto) => {
                    
                    addDoc(productosCollection, producto)
                        .then(() => {
                            toast.success(`Producto ${producto.title} agregado a la base de datos`);
                        })
                        .catch((error) => {
                            console.error("Error al agregar producto:", error);
                            toast.error("Hubo un error al agregar productos");
                        });
                });
            })
            .catch((error) => {
                console.error("Error al cargar el archivo JSON:", error);
                toast.error("Error al cargar el archivo JSON");
            });
    };

    return (
        <div className="carrito">
            <h1>Carrito</h1>
            <p className="product-card__descriptionprice">Cantidad de productos: {valor.cantProd}</p>
            <p className="product-card__descriptionprice">Total: ${valor.totalPrecio}</p>
            <br></br>
            <ul>
                {valor.carrito.map((item, indice) => {
                    return (
                        <li key={indice}>
                            <p>{item.title} - unidad : ${item.price} <button className="buttonEliminar" onClick={() => handleEliminar(item.id)}>Eliminar</button></p>
                            
                        </li>
                    );
                })}
            </ul>
            <Formulario />

            <button onClick={handleClick}>Agregar producto a DB</button>
            <button onClick={handleClickTraer}>Traer productos de DB</button>
            <button onClick={handleUploadProducts}>Subir productos desde JSON a Firestore</button>
        </div>
    );
};

export default Carrito;

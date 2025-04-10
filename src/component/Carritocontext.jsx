import { createContext, useState } from "react";

export const carritoContexto = createContext();

export const Provider = carritoContexto.Provider;

const CarritoProvider = (props) => {

    const [carrito, setCarrito] = useState([]);
    const [cantProd, setCantProd] = useState(0);
    const [totalPrecio, setTotalPrecio] = useState(0);

    const handleAgregar = (producto) => {
        const copia = [...carrito];
        copia.push(producto);
        setCarrito(copia);

        setCantProd(cantProd + 1);
        setTotalPrecio(totalPrecio + producto.price);
    };

    const handleEliminar = (productoId) => {
        const index = carrito.findIndex(producto => producto.id === productoId);
    
        if (index !== -1) {
            const copia = [...carrito];
            const productoEliminado = copia.splice(index, 1)[0];
    
            setCarrito(copia);
            setCantProd(cantProd - 1);
            setTotalPrecio(totalPrecio - productoEliminado.price);
        }
    };
    

    const handleVaciar = () => {
        setCantProd(0);
        setTotalPrecio(0);
        setCarrito([]);
    };

    const valorDelContexto = {
        carrito,
        cantProd,
        totalPrecio,
        handleAgregar,
        handleEliminar,
        handleVaciar,
    };

    return (
        <Provider value={valorDelContexto}>
            {props.children}
        </Provider>
    );
};

export default CarritoProvider;

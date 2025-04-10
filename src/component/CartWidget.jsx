import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { carritoContexto } from "./Carritocontext";  

const CartWidget = () => {

    const valor = useContext(carritoContexto)

    return (
        <NavLink viewTransition to="/carrito" className="header__link">
            <img src="/shopping-cart.svg" alt="Icono de carrito" />
            {valor.cantProd}
        </NavLink>
    )
}

export default CartWidget
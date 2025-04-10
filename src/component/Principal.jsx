import React from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

export const Principal = () => {
  return (
    <header className="header">
      
      <div className="header__row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
          
          <NavLink to="/" className="header__link">
            <h1>Mi Tienda Online</h1>
          </NavLink>
        </div>
        <div>
  <nav className="header__nav">
    <NavLink to="/" className="header__link">Home</NavLink>
    <NavLink to="/categorias/perfumes" className="header__link">Belleza</NavLink>
    <NavLink to="/categorias/muebles" className="header__link">Muebles</NavLink>
    <NavLink to="/categorias/comida" className="header__link">Comida</NavLink>
    <CartWidget/>
  </nav>
</div>
</div>

</header>
  )
};

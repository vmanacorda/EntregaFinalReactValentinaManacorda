import { Routes, Route } from "react-router-dom";
import { Principal } from "./Principal";
import Footer from "./Footer";
import Carrito from "./Carrito";
import CartWidget from "./CartWidget";
import ItemListContainer from "./ItemListContainer";
import ProductDetailContainer from "./ProductDetailContainer";
import CarritoProvider from "./Carritocontext"; 
import { Toaster } from "react-hot-toast";
import Pago from "./Pago";  


const App = () => {
  return (
    <CarritoProvider>
      <Principal>
        <CartWidget />
      </Principal>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/categorias/:id" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ProductDetailContainer />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} /> 
      </Routes>
      <Footer />
      <Toaster />
    </CarritoProvider>
  );
}

export default App;

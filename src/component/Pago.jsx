import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast"; 
import { db, collection, addDoc } from "../../firebaseconfig"; 
import { useNavigate } from "react-router-dom"; 
import { useContext } from "react";
import { carritoContexto } from "./Carritocontext"; 

function Pago() {
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate(); 
  const { handleVaciar } = useContext(carritoContexto);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!numeroTarjeta || !fechaVencimiento || !cvv) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    
    if (numeroTarjeta.length !== 16) {
      toast.error("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

   
    if (cvv.length !== 3) {
      toast.error("El CVV debe tener 3 dígitos.");
      return;
    }

    setLoading(true); 

    const datosPago = {
      numeroTarjeta,
      fechaVencimiento,
      cvv,
      fecha: new Date().toISOString(), 
    };

    try {
      
      const pagosRef = collection(db, "pagos");
      const docRef = await addDoc(pagosRef, datosPago);

      
      toast.success("¡Pago realizado con éxito! ");

      handleVaciar();
      
      setNumeroTarjeta("");
      setFechaVencimiento("");
      setCvv("");

      // 
      setTimeout(() => {
        navigate("/"); 
      }, 3000); 

      
    } catch (error) {
      console.error("Error al procesar el pago:", error);

      
      toast.error("Hubo un error al procesar el pago. Intenta nuevamente.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="carrito ">
      <h1>Proceso de Pago</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="numeroTarjeta">Número de tarjeta</label>
          <input
            type="text"
            id="numeroTarjeta"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
          <input
            type="text"
            id="fechaVencimiento"
            placeholder="MM/AA"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar Pago"}
        </button>
      </form>

     
    </div>
  );
}

export default Pago;

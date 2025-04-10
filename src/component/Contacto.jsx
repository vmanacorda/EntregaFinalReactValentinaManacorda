import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { db, collection, addDoc } from "../../firebaseconfig"; 
import { toast } from "react-hot-toast"; 

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); 

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const datosContacto = {
      nombre,
      email,
      mensaje,
      fecha: new Date().toISOString(), 
    };

    try {
      
      const contactoRef = collection(db, "contactos"); 
      await addDoc(contactoRef, datosContacto); 

      toast.success("¡Mensaje enviado con éxito!");

      setTimeout(() => {
        navigate("/pago"); 
      }, 3000); 

      
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error("Hubo un error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <div className="contacto">
      <h2>Formulario de Contacto</h2>
      <p>Por favor, completa los siguientes datos para contactarnos.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;

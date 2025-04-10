import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import toast from "react-hot-toast";
import { db, collection, addDoc } from "../../firebaseconfig";

function Formulario() {
  const [valorDelInputNombre, setValorDelInputNombre] = useState("");
  const [valorDelInputEmail, setValorDelInputEmail] = useState("");
  const [valorDelInputTelefono, setValorDelInputTelefono] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!valorDelInputNombre || !valorDelInputEmail || !valorDelInputTelefono) {
      toast.error("Por favor, completa todos los campos del formulario para continuar.");
      return;
    }

    try {
      const clientesCollection = collection(db, "clientes");
      await addDoc(clientesCollection, {
        nombre: valorDelInputNombre,
        email: valorDelInputEmail,
        telefono: valorDelInputTelefono,
        fecha: new Date().toISOString(),
      });

      toast.success("¡Datos guardados correctamente!");
      navigate("/pago");
    } catch (error) {
      console.error("Error al guardar cliente en Firebase:", error);
      toast.error("Error al guardar los datos. Intenta nuevamente.");
    }
  };

  const handleInputValueNombre = (data) => {
    setValorDelInputNombre(data);
  };
  const handleInputValueEmail = (data) => {
    setValorDelInputEmail(data);
  };
  const handleInputValueTelefono = (data) => {
    setValorDelInputTelefono(data);
  };

  return (
    <div>
      <h1>Finalizar Compra</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <Input
            onInputValue={handleInputValueNombre}
            value={valorDelInputNombre}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            onInputValue={handleInputValueEmail}
            value={valorDelInputEmail}
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono</label>
          <Input
            onInputValue={handleInputValueTelefono}
            value={valorDelInputTelefono}
          />
        </div>
        <button type="submit">Comprar</button>
      </form>
    </div>
  );
}

export default Formulario;

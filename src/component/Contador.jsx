import { useState } from "react"

export const Contador = () => {

    const [contador, setContador] = useState(0)
    const [isDarkMode, setIsDarkMode] = useState(true)

    const handleSumar = () => {
        setContador(contador + 1)
    }

    const handleRestar = () => {
        setContador(contador - 1)
    }

    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className={isDarkMode ? "dark" : "light"}>
            <p>Cantidad : {contador}</p>
            <button onClick={handleSumar}>sumar</button>
            <button onClick={handleRestar}>restar</button>
            <button onClick={handleDarkMode}>cambiar modo claro/oscuro</button>
        </div>
    )
}
import { useRef } from "react"

const Input = (props) => {

    const inputRef = useRef()

    const handleChange = (event) => {
       
        props.onInputValue(inputRef.current.value)
    }

    return (
        <input
            onChange={handleChange}
            type="text"
            id="nombre"
            name="nombre"
            ref={inputRef}
        />
    )
}

export default Input
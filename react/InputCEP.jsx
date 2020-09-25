import React, {Fragment, useState, useCallback} from "react"
import { useEffect } from "react"

function InputCEP() {
    const [cep, setCep] = useState("")

    const updateCep = useCallback((event) => {
        setCep(event.currentTarget.value)
    }, [cep])

    const formatInput = useCallback((event) => {
        mask(event.currentTarget, "#####-###")
    })

    const cleanCepInput = useCallback((event) => {
        // Expire
        console.log(event.currentTarget.previousElementSibling.value)
        document.cookie = `cep = ${event.currentTarget.previousElementSibling.value}; Max-Age=-99999999;`
        event.currentTarget.previousElementSibling.value = ""
    })

    const submitForm = useCallback((event) => {
        fetch(`https://viacep.com.br/ws/${cep}/json`)
            .then(response => response.json())
            .then(result => {
                if (result.true) {
                    alert("Digite um CEP válido")
                    return
                } else {
                    let expires
                    let date
            
                    date = new Date()
                    date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000))
                    expires = date.toUTCString()
            
                    document.cookie = `cep = ${cep}; expires = ${expires}; path = /`
                }
            })
    }, [cep])

    const mask = useCallback((val, mask) => {
        let i = val.value.length
        let ending = mask.substring(1,0)
        let text = mask.substring(i)
        
        if (text.substring(0,1) != ending) {
            val.value += text.substring(0,1)
        }
    }, [cep])

    useEffect(() => {
        let expires
        let date

        date = new Date()
        date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000))
        expires = date.toUTCString()

        document.cookie = `cep = 01000-000; expires = ${expires}; path = /`
    }, [])

    return (
        <Fragment>  
            <input type="text" name="cep" minLength="9" maxLength="9" onChange={updateCep} onKeyPress={formatInput} required />
            <span onClick={cleanCepInput}>x</span>
            <input type="submit" value="OK" onClick={submitForm}/>
        </Fragment>
    )
}

export default InputCEP
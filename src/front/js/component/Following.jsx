import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { Navigate, useNavigate } from "react-router-dom"


let initialSubject = {
    label: ""

}

const Following = () => {

    const [subject, setSubject] = useState(initialSubject)
    const [subjectList, setSubjectList] = useState([])
    const [error, setError] = useState(false)


    const handleChange = (event) => {
        setSubject({
            label: event.target.value,
        })
    }


    const handleSaveSubject = (event) => {
        if (event.key === "Enter") {
            if (subject.label.trim() !== "") {
                setSubjectList([...subjectList, subject])
                setSubject(initialSubject)
                setError(false)
            }
            else {
                setError(true)
                console.log("Ingresa un tema de tu interés")
            }
        }
    }

    const deleteSubject = (id) => {
        let newArr = subjectList.filter((item, index) => index != id)
        setSubjectList(newArr)

    }

    return (
        <>
            <div className="container">
                <div>
                    <h1>Lista de Temas de Interés</h1>
                    {error ? <h3 className="errorMessage">Todos los campos son obligatorios</h3> : ""}
                    <form onSubmit={(event) => event.preventDefault()}>
                        <input className="textArea "
                            type="text"
                            value={subject.label}
                            placeholder="Escribe un tema"
                            onChange={handleChange}
                            onKeyDown={handleSaveSubject}
                        >
                        </input>
                    </form>
                    <ol className="d-flex justify-content-between flex-wrap">
                        {subjectList.map((item, index) => {
                            return <h2><span class="badge bg-secondary m-2 p-2" key={index} onClick={() => deleteSubject(index)}>{item.label}</span></h2>

                        })}
                    </ol>
                </div>
            </div>


            <div className="container">
                <div className="row col-12 md-6 d-flex justify-content-center">
                    <h1>Estas son las personas que sigues</h1>
                    <ol>
                        <li> Favorito 1  </li>
                        <li> Favorito 2  </li>
                        <li> Favorito 3  </li>
                    </ol>
                </div>
            </div>

        </>
    )

}

export default Following
import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext"
import { Link, useParams } from "react-router-dom";



const Background = () => {
    const { store, actions } = useContext(Context)
    const { nature, id } = useParams()


    const getSubjectsList = () => {
        actions.getAllSubjects()
    }


    useEffect(() => { getSubjectsList() }, [])

    return (
        <>
            <div className="">
                <div className="">
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <Link className="nav-item" to="/user">
                                    <button className="nav-link active p-2 m-2"> Informacion general </button>
                                </Link>
                                <Link to="/user/background">
                                    <button className="nav-link active p-2 m-2" > ¿Quieres ser profesor? </button>
                                </Link>
                            </ul>
                        </div>

                        <div className="container">
                            <div className="d-flex justify-content-center m-3 border border-secondary m-3 p-3 ">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                        ¿Quieres ser profesor?
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center">
                            {store.subjects.map((item) => {
                                return (


                                    <div className="col-6 md-4 d-flex justify-content-between m-3 border border-secondary m-3 p-3" >
                                        <h4 className="card-title d-flex justify-content-between">{item.name} </h4>
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => actions.addSubject(item.id)} className="btn bg-warning"> Enseñar <i className="fa-solid fa-chalkboard-user"></i></button>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}



export default Background
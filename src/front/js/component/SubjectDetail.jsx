import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link } from "react-router-dom";


const SubjectDetail = ({ item }) => {
    const { store, actions } = useContext(Context)


    return (


        <div>
            <div className="card mb-3">
                <img src={item?.image_banner} className="subject-img img-thumbnail card-img-top" alt="..." />
                <div className="card-body">

                    <h5 className="card-title">{item?.name}</h5>
                    <p className="card-text">Aqui encontrarás los mejores mentores sobre {item?.name}</p>
                </div>

            </div>


            <div className="container">
                <h2>Profesores Disponibles</h2>
                <div className="my-carrousel">

                    {store.teachers.map((teacher) => {
                        return (


                            <div key={teacher.user.id} className="card mb-3 border border-secondary " >
                                <h3 className="card-title d-flex justify-content-center">{teacher.user?.name} {teacher.user?.last_name}</h3>
                                <div className="card-body d-flex justify-content-between">
                                    <img className="my-img mx-2" src={teacher.user.avatar} />
                                    <div className="d-flex flex-column">
                                        <p className="card-text"> Descripción : {teacher.user?.description}</p>
                                        <p className=""> Contacto: {teacher.user.email}</p>
                                        {/*<Link to={`/user/{teacher.user.id}`} className="btn btn-primary"> Entra a mi perfil </Link>*/}
                                        <Link to={`/user/${teacher.user.id}`}>
                                            <button onClick={() => actions.getUserById(teacher.user)} className="btn btn-primary"> Entra a mi perfil </button>
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button onClick={() => actions.addFavorite(teacher)} className="btn bg-warning"><i className="fa-solid fa-star"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>


    )
}

export default SubjectDetail

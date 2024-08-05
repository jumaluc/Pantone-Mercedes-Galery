import { useState, useEffect } from "react";
import "../Estilos/PantonewebMain.css";
import { useNavigate } from "react-router-dom";
import { AgregarClientes } from "./AgregarClientes.jsx";
import { IconoCerrarAct } from "./IconoCerrarAct.jsx";
import { EstasSeguroBorrar } from "./EstasSeguroBorrar.jsx";

export function PantoneWebMain({ setActualizarApp, actualizarApp }) {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate(); 
    const [formVisible, setFormVisible] = useState(false);
    const [cerrarVisible, setCerrarVisible] = useState(null);
    const [estasSeguroVisible, setEstasSeguroVisible] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        fetch("http://localhost:3000/")
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(err => console.error("Error en la API " + err));
    }, [actualizarApp]);

    function handleClick(cliente) {
        navigate(`/cliente/${cliente.id}/${cliente.nombre}/${cliente.apellido}`);
    }

    return (
        <main>
            <section className="pantoneweb-section">
                {clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <div key={cliente.id} className="pantoneweb-div"  
                             onMouseEnter={() => setCerrarVisible(cliente.id)}
                             onMouseLeave={() => setCerrarVisible(null)}
                             onClick={() => handleClick(cliente)}>
                            {cerrarVisible === cliente.id && (
                                <div className="pantoneweb-icono-container">
                                <img onClick={(e)=>{e.stopPropagation()}} className="pantoneweb-icono-agregar" src="https://cdn.icon-icons.com/icons2/1875/PNG/512/plus_120249.png" alt="imagen"/>
                                <IconoCerrarAct clienteID={cliente.id} setEstasSeguroVisible={setEstasSeguroVisible} clase={"pantoneweb-cerrar"} /> 

                                </div>
                            )}
                            <strong className="pantoneweb-strong">{cliente.nombre}</strong>
                            <strong className="pantoneweb-strong">{cliente.apellido}</strong>
                        </div>
                    ))
                ) : (
                    <p>No hay clientes disponibles</p>
                )}
                <button className="pantoneweb-boton" onClick={() => setFormVisible(true)}>Agregar Cliente</button>
                {formVisible && <AgregarClientes setActualizarApp={setActualizarApp} setFormVisible={setFormVisible} />}

                {estasSeguroVisible !== null && <EstasSeguroBorrar clienteID={estasSeguroVisible} setActualizarApp={setActualizarApp} setEstasSeguroVisible={setEstasSeguroVisible} />}
            </section>
           

        </main>
    );
}

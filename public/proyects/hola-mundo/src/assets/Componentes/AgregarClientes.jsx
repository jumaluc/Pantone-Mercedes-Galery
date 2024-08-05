import "../Estilos/AgregarClientes.css";
import { useState } from "react";

export function AgregarClientes({ setFormVisible, setActualizarApp }) {


    async function handleSubmit(e) {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const apellido = e.target.apellido.value;
        const fotos = e.target.fotos.files

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        Array.from(fotos).forEach((file) => {
            formData.append(`fotos`, file);

        })

        console.log("Form data", formData.values());

        
        await fetch("http://localhost:3000/agregarCliente", {
            method: "POST",
            body: formData
        })
        .then(
            setFormVisible(prev => !prev)
        )
        .then(setActualizarApp(prev => !prev))

        .catch(err => console.error("Error al intentar agregar un nuevo cliente" + err));
    }

    return (
        <section>
            <main className="agregarClientes-main">
                <form onSubmit={handleSubmit}>
                    <button className="close" onClick={() => setFormVisible(false)}><img src="https://cdn-icons-png.flaticon.com/128/458/458594.png" /> </button>
                    <h3>Nuevo Cliente</h3>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />
                    <input type="text" id="apellido" name="apellido" placeholder="Apellido" required />
                    <label>Ingrese las fotos</label>
                    <input type="file" id="fotos" name="fotos" multiple/>
                    <button type="submit" className="agregarClientes-button">Agregar</button>
                </form>
            </main>
        </section>
    );
}

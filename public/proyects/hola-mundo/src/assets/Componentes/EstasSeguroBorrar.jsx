import { set } from "zod";
import "../Estilos/EstasSeguroBorrar.css";

export function EstasSeguroBorrar({clienteID, setEstasSeguroVisible, setActualizarApp}) {

    async function borrarCliente(){
        const id = clienteID;
        await fetch(`http://localhost:3000/${id}`, {
            method: "DELETE",
        })
        
         //voy a tener que mostrar un cartel diciendo que esta todo ok o  no
        setActualizarApp(prev => !prev);
        setEstasSeguroVisible(null);

    }

    return (

        <section className="estasSeguro-section">
            <main>
                <h3>¿Estás seguro de borrar al cliente?</h3>
                <div>
                    <button onClick={borrarCliente}>Si</button>
                    <button onClick={()=>setEstasSeguroVisible(null)}>No</button>
                </div>
            </main>
        </section>



    )
}
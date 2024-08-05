import "../Estilos/GaleriaFotosSeleccionador.css";
import {Check} from "./Check.jsx";
import {Send} from "./Send.jsx";
export function GaleriaFotosSeleccionador(){


    return(
        <header className="seleccionador-header">
            <div className="seleccionador-div">
                <div className="seleccionador-div-texto">
                    <h3>¡SELECCIONE LAS FOTOS QUE LE GUESTEN!</h3>
                    <strong>PANTONE MERCEDES</strong>
                </div>
                <div className="seleccionador-div-iconos">
                   <label><Check/></label> 
                    <label><Send/></label>
                </div>
            </div>
        </header>
    )
}
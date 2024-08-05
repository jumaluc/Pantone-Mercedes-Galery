import {X} from './Close.jsx';
import {Send} from './Send.jsx';
import "../Estilos/GaleriaFotosCantidadSelec.css";
export function GaleriaFotosCantidadSelec({cant}){

    let seleccionadas = cant;

    if(seleccionadas !== 1){
         seleccionadas = `${cant} seleccionadas`;
    }
    else{
         seleccionadas = `${cant} seleccionada`;
    }

    return (
        <header className="seleccionador-header">
        <div className="seleccionador-div">
            <div className="seleccionador-div-texto2">
                <X className="selecionador-close"/>
                <h3>{seleccionadas}</h3>
            </div>
            <div className="seleccionador-div-iconos">
                <label><Send/></label>
            </div>
        </div>
    </header>
    )
}
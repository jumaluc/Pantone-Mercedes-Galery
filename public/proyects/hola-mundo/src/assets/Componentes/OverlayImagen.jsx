import "../Estilos/OverlayImagen.css";


export function OverlayImagen({ url, onClose }) {
    return (
        <div className="overlay" onClick={onClose}>
            <img src={url} alt="Imagen grande" className="overlay-img" />
        </div>
    );
}

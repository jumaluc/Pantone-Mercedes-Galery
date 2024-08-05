import { useParams } from "react-router-dom";
import "../Estilos/GaleriaFotos.css";
import { useState,useEffect } from "react";
import { OverlayImagen } from "./OverlayImagen";
import { GaleriaFotosSeleccionador } from "./GaleriaFotosSeleccionador";
import {Check} from "./Check.jsx";
import { GaleriaFotosCantidadSelec } from "./GaleriaFotosCantidadSelec.jsx";
import { motion, AnimatePresence } from 'framer-motion';


export function GaleriaFotos(){
    const {id, nombre, apellido} = useParams();
    const [imagenes, setImagenes] = useState([]);
    const nombreApellido = nombre.toLocaleUpperCase() + " " + apellido.toLocaleUpperCase();
    const [selectedImage, setSelectedImage] = useState(null); 
    const [overlayVisible, setOverlayVisible] = useState(false); 
    const [checkVisible, setCheckVisible] = useState(null); //mantiene el 
    const [informacionImgCheckeada, setInformacionImgCheckeada] = useState([]);
    const [indexImgCheckeada, setIndexImgCheckeada] = useState([]);
    const [cantidadImgSeleccionadas, setCantidadImgSeleccionadas] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la API");
            }
            return response.json();
        })
        .then(data => { //Devuelve URLs de imágenes
            setImagenes(data)
        })
        .catch(err => console.error("Error en la API " +err))
    },[])

    const handleImageLoad = (event) => {
        const img = event.target;
        const { naturalWidth, naturalHeight } = img;
        if (naturalHeight > naturalWidth) {
            img.classList.add('vertical');
        } else {
            img.classList.add('horizontal');
        }
    };
    const handleImageClick = (url) => {
        setSelectedImage(url);
        setOverlayVisible(true);
    };

    const handleOverlayClose = () => {
        setOverlayVisible(false);
        setSelectedImage(null);
    };
    const handleClickImgCheckeada = (index) => {
        if(indexImgCheckeada.includes(index)){
            setIndexImgCheckeada(indexImgCheckeada.filter((imgIndex) => imgIndex !== index));
            setInformacionImgCheckeada(informacionImgCheckeada.filter((img,indexImg) => indexImg !== index));
            setCantidadImgSeleccionadas(cantidadImgSeleccionadas - 1);
            return;
        }
        setCantidadImgSeleccionadas(cantidadImgSeleccionadas + 1);
        setIndexImgCheckeada([...indexImgCheckeada,index]);
        setInformacionImgCheckeada([...informacionImgCheckeada, imagenes[index]]);

    }
    console.log(cantidadImgSeleccionadas);

    return (
        <>
            <header className="galeriaFotos-header">
                <h2>{nombreApellido}</h2>
                <strong>PANTONE MERCEDES</strong>
            </header>
      
            <main className="galeriaFotos-main"> 
                    {cantidadImgSeleccionadas === 0 
                    ? 
                        (
        
                            <GaleriaFotosSeleccionador/>  
                        )
                        :   
                        (
               
                            <GaleriaFotosCantidadSelec cant={cantidadImgSeleccionadas}/>
                        )

                    }
                    <div className="galeriaFotos-div">
                        {
                            imagenes.length > 0 ? (
                                imagenes.map((url, index) => (
                                    <div key={index} className="galeriaFotos-container-imagen"  onMouseEnter={()=>{setCheckVisible(index)}} onMouseLeave={()=>{setCheckVisible(null)}}>
                                   {checkVisible === index  ? <Check  onClick={()=>handleClickImgCheckeada(index)} className={"galeriaFotos-check"}/> : null }
                                    {indexImgCheckeada.includes(index) ?
                                    <> 
                                        <Check  onClick={()=>handleClickImgCheckeada(index)} className={"galeriaFotos-check-clicked"}/> 
                                        <img key={index} src={url} alt="Imagen de cliente"  onClick={()=>handleImageClick(url)} className={"galeriaFotos-img-cheackeada"} onLoad={handleImageLoad}/> 
                                    </>
                                    : 
                                        <img key={index} src={url} alt="Imagen de cliente" onClick={()=>handleImageClick(url)} className="galeriaFotos-img"    onLoad={handleImageLoad}/>}
                                   </div>
                                ))
                            ) : (
                                <p>No hay imágenes disponibles</p> // Mensaje si no hay imágenes
                            )
                        }
                        
                    </div>
                    {overlayVisible && (
                    <OverlayImagen
                        url={selectedImage}
                        onClose={handleOverlayClose}
                    />
                )}
                
            </main>
        </>
    )
}
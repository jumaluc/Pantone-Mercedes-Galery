const express = require('express');
const multer = require('multer');
const app = express();

const {ImagenesControlador} = require("./Controlador/imagenes-controlador.js");
const {uploadFile, listFilesByPrefix, getFiles} = require("./Google Cloud/apiCloud.js");

const cors = require('cors');
app.use(express.json());
app.use(cors());
const upload = multer({
    dest: 'uploads/'
}); 


app.get("/", ImagenesControlador.obtenerClientes);

app.get('/:id', ImagenesControlador.obtenerTodasLasImagenes);

app.post("/agregarCliente", upload.array("fotos",100), ImagenesControlador.agregarCliente);

app.post("/:id", upload.array("imagenes", 100), ImagenesControlador.subirImagenes);

app.delete("/:id", ImagenesControlador.borrarCliente);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
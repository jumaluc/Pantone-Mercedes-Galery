const {ImagenesModelo} = require("../Modelo/imagenes-modelo.js");
const {funcionGenerarSchema} = require("../validaciones.js");

class ImagenesControlador{

    static async agregarCliente(req, res){

        const datosCompletos = {
            ...req.body,
            fotos: req.files.map(file => ({
                originalname: file.originalname,
                mimetype: file.mimetype,
                path: file.path,
                size: file.size
            }))
        };

        const cliente =  await funcionGenerarSchema(datosCompletos);

        if(cliente.success === false){
            res.status(400).send(cliente.error.errors);
            return;
        }
        const id = await ImagenesModelo.agregarCliente(cliente.data.nombre, cliente.data.apellido);
        ImagenesModelo.subirImagenes(cliente.data.fotos, id);

    }

    static async obtenerTodasLasImagenes(req, res){
        const imagenes = await ImagenesModelo.obtenerTodasLasImagenes(req.params.id);
        if(imagenes.length === 0){
            res.status(404).send("No se encontraron imágenes");
            return;
        }
        res.json(imagenes); // Enviar URLs de imágenes
    };

    static async subirImagenes(req, res){
        //verificar que sean imagenes
        
        const files = req.files;
        ImagenesModelo.subirImagenes(files);
        console.log("Imagenes subidas")
        res.send("Imagenes subidas");
    };
    static async obtenerClientes(req, res){
        try{
            const clientes = await ImagenesModelo.obtenerClientes();
            res.json(clientes);
        }
        catch(err){
            console.error("Error en el controlador" + err);
        }
    }
    static async borrarCliente(req, res){
        const id = req.params.id;
        await ImagenesModelo.borrarCliente(id);
        res.send("Cliente borrado correctamente");
    }
}



module.exports = {ImagenesControlador};
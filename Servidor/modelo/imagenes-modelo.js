const {uploadFile, listFilesByPrefix, getFiles, saveImage} = require("../Google Cloud/apiCloud.js");
const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user:"root",
    port: 3306,
    password: "Obi1301wan",
    database: "PantoneDB"
}
let connection;
(async () => {
    connection = await mysql.createConnection(config);
})();

class ImagenesModelo{

    static async agregarCliente(nombre, apellido){
        try{
            await connection.query("INSERT INTO clientes (nombre, apellido) VALUES (?, ?)", [nombre, apellido]);
            const [result] = await connection.query("SELECT id FROM clientes WHERE nombre = ? AND apellido = ?", [nombre, apellido]);
            const id = result[0].id;
            return id;
        }
        catch(err){
            console.error("Error al acceder a la base de datos" + err);
        }
    }



    static async obtenerTodasLasImagenes(id = 1) {
        try {
            const [result] = await connection.query("SELECT nombreImg FROM imagenes WHERE id_cliente = ?", [id]);
            const urls = await Promise.all(
                result.map(async (file) => {
                    const url = await getFiles(file.nombreImg);
                    return url;
                })
            );
            return urls; 
        } catch (err) {
            console.error(err);
        }
    }
    static async subirImagenes(files, id){
        
        files.forEach(async file => {
            await saveImage(file); 
            await connection.query("INSERT INTO imagenes (nombreImg, id_cliente) VALUES (?, ?)", [file.originalname, id]);
        });
       

        return "Imagenes subidas";
    }
    static async obtenerClientes(){
        try{
            const [clientes] = await connection.query("SELECT * FROM clientes");
            return clientes;
        }
        catch(err){
            console.error("Error al acceder a la base de datos" + err);
        }

    }
    static async borrarCliente(id){
        try{
            await connection.query("DELETE FROM clientes WHERE id = ?", [id]);
            await connection.query("DELETE FROM imagenes WHERE id_cliente = ?", [id]);
        }
        catch(err){
            console.error("Error al acceder a la base de datos" + err);
        }
    }
}

module.exports = {ImagenesModelo};
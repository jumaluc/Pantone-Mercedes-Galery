const {Storage} = require("@google-cloud/storage");
require("dotenv").config();

const projectId = "pantone-web";
const keyFilename = "C:/Users/jmcar/OneDrive/Escritorio/React/AprendiendoReact/Servidor/Google Cloud/pantone-web.json";
const storage = new Storage({projectId, keyFilename});
const bucketName = "pantone-almacen-imagenes";
const bucket = storage.bucket(bucketName);

async function uploadFile(bucketName, file, fileOutputName) {
    try{
        const ret = await bucket.upload(file, {
            destination: fileOutputName
        });
        return ret,
        console.log(`File uploaded to ${bucketName}/${fileOutputName}`);
    }
    catch(err){
        console.log(err);
    }
}

//const ret = await uploadFile("imagen1.jpg", "imagen1.jpg");


async function listFilesByPrefix(folderPrefix) {

    const [files] = await bucket.getFiles({ prefix: folderPrefix });
  
    console.log('Archivos en la carpeta:');
    files.forEach(file => {
      console.log(file);
    });
  }


/*
async function getFiles(fileName) {
    try {
        const file = bucket.file(fileName);
        return file.createReadStream()
    } catch (err) {
        console.log(err);
    }
}
*/
async function getFiles(fileName) {
    try {

        const file = await bucket.file(fileName);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-17-2025' 
        });
        return url;
    } catch (err) {
        console.log("Error en la API de GOOGLE CLOUD "+err); 
    }
}

async function  saveImage (file){
    try{
         await uploadFile(process.env.BUCKET_NAME,file.path, file.originalname);
        return;
    }
    catch(err){
        console.log(err);
    }
}




module.exports = {
    uploadFile,
    listFilesByPrefix,
    getFiles,
    saveImage
}
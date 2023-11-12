const { response, request } = require('express')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backups'); // /uploadsEspecifica el directorio donde se almacenará la imagen
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Especifica el nombre del archivo
    }
});
const upload = multer({ storage: storage }).single('myBackup');

const uploadFile = (req = request, res = response) => {
    upload(req, res, function (err) {
        const { name } = req.body;
        if (err) {
            // Maneja cualquier error
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'success', path: req.file.path, name: name });
    });
}
const download = (req = request, res = response) => {
    const { name } = req.query;
    
    const file = `./backups/${name}`;
    res.download(file); // Set disposition and send it.
}


module.exports = {
    uploadFile,
    download
}

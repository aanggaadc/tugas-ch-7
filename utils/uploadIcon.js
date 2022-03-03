const multer = require('multer')
const directory = __dirname + "/../public/icon"
const filter = (req, file, cb) => {
    if (
        file.mimetype.includes('image/png') || file.mimetype.includes('image/svg')) {
        cb(null, true)
    }else{
        cb(new Error('Harap Upload File dengan Format SVG atau PNG'))
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory)
    },
    filename: function (req, file, cb){
        const randomNumber = Math.round(Math.random() * 10)
        cb(null, `icon-${randomNumber}.${file.originalname.split('.').pop()}`)
    }
})

let uploadIcon = multer({
    storage: storage,
    fileFilter: filter
})

module.exports = uploadIcon
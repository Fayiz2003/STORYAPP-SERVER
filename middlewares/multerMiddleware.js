const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename: (req,file,callback)=>{
        callback(null,`Image-${Date.now()}-${file.originalname}`)
    }
})

const multerMiddleware = multer({
    storage
})

module.exports = multerMiddleware
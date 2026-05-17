const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),    //temperory storing the pdf
    limits: {
        fileSize: 3*1024*1024   // max size 3MB
    }
})

module.exports = upload
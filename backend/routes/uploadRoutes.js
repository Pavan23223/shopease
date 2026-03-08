const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({

  destination(req,file,cb){
    cb(null,"uploads/")
  },

  filename(req,file,cb){
    cb(null,Date.now() + path.extname(file.originalname))
  }

})

const upload = multer({ storage })

router.post("/", upload.single("image"), (req,res)=>{
  res.json({
    image:req.file.filename
  })
})

module.exports = router
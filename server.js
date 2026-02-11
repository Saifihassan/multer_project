import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { url } from 'inspector'


const app = express()
const PORT = 5000

app.use(express.json())
app.use('/files',express.static("uploads"))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now()+"-"+file.originalname
        cb(null,uniqueName)
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:5*1025*1024},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpeg'||file.mimetype==='image/png')
        {
            cb(null,true)
        }
        else{
            cb(new Error('Invalid file type '))

        }
    }
})

app.post("/upload",upload.fields([{name:'avatar',maxCount:1},{name:'work',maxCount:3}]),(req,res)=>{
    // console.log(req.file['avatar'])
    // console.log(req.file['work'])
    const profileURl = `http://localhost:5000/files/${req.files['avatar'][0].filename}`

    





    res.json({
        message:"files uploaded",
        viewLinks:{
            profile:profileURl,
            workImages: req.files['work'].map(f =>(`http://localhost:5000/files/${f.filename}`))
        }
    })
})

app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})
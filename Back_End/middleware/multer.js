import { error } from 'console'
import multer, { diskStorage } from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))// path.extname(file.originalname) create a string
    }
})

const fileFilter=(req,file,cb)=>{
    const allowType=['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    if(allowType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new error('file type not supported'))
    }
}

const uploads = multer({storage,fileFilter})
export default uploads;
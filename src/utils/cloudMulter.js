import multer from 'multer'

export const fileValidation = {
    image :['image/jpeg' , 'image/png' , 'image/gif','image/jpg'],
    file:['application/pdf,application/msword']
}

export function fileUpload (customValidation =[]){
    console.log(customValidation);
    const storage = multer.diskStorage({})
    function fileFilter(req,file,cb){
        console.log(file.mimetype);
        console.log(customValidation.includes(file.mimetype));
        if(customValidation.includes(file.mimetype)){
            cb(null , true)
        }else{
            cb('In - valid file format' , false)
        } 
    }
    const upload = multer ({fileFilter,storage})
    return upload
}
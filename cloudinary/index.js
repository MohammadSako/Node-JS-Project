const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET    
})
const storage = new CloudinaryStorage({
    cloudinary,
    params: {   //=> this will create a folder in cloudinary and will name it ShoppingMarket
        folder: 'market',
        allowedFormats: ['jpeg', 'png', 'jpg', 'jfif']
    }
})
module.exports = {
    cloudinary,
    storage
}

/** Load multer external middleware for file uploads **/
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/assests/images',
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
});

// Define the file filter function
const fileFilter = (_, file, cb) => {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|gif/;
    // Check the file extension
    const extname = filetypes.test(file.originalname.toLowerCase());
    // Check the MIME type
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only *.jpg, *.jpeg, *.png, or *.gif files are allowed!'), false);
    }
};

// Create the multer instance with storage, file filter, and size limit
const uploadObj = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB (in bytes)
    }
});

module.exports = uploadObj;
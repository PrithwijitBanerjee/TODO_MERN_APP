/** Load multer for file upload handling **/
const multer = require('multer');

/** load upload object module **/
const uploadObj = require('../uploads/fileConfig');

// Middleware to handle file upload errors
const handleFileUpload = (req, res, next) => {
    uploadObj.single('imgUrl')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File size exceeds the limit of 5 MB!' });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

module.exports = handleFileUpload;
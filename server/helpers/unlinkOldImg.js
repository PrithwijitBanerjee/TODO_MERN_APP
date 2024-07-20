/** Load fs core module **/
const fs = require('node:fs');

exports.unlinkOldImg = (oldImgPath, cb) => {
    if (oldImgPath) {
        fs.unlink(oldImgPath, cb);
    } else {
        cb();
    }
};
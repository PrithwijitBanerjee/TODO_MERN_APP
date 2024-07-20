/** Load bcryptjs external module/ package for password hashing **/
const bcrypt = require('bcryptjs');

const generateHashPass = async actualPass => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(actualPass, salt);
        return hashPassword;
    } catch (err) {
        return err;
    }
};

module.exports = generateHashPass;
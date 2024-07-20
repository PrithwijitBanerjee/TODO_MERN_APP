/** Load bcryptjs external module/ package for password hashing **/
const bcrypt = require('bcryptjs');


const verifyHashPass = async (actualPass, hashPass) => {
    try {
        const isValidPass = await bcrypt.compare(actualPass, hashPass);
        return isValidPass;
    } catch (error) {
        return error;
    }
};

module.exports = verifyHashPass;
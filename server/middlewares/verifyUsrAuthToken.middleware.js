/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');


// create custom middleware to verify jwt token for user authentication purposes
exports.verifyUsrAuthToken = (req, res, next) => {
    const bearerHeaderToken = typeof (req.headers['authorization']) !== 'undefined' ? req.headers['authorization'].split(' ')[1] : false;
    if (bearerHeaderToken) {
        try {
            const usrData = jwt.verify(bearerHeaderToken, process.env.JWT_SECRET_KEY);
            if (usrData) {
                req.id = usrData?.userId;
                next();
            }
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error && error?.message === "jwt expired" && "Dear user, your token has been expired, plz login again !!!"
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Can not access this route, plz provide token in header !!!'
        });
    }
};


/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');

// create custom middleware to verify user role for user authentication purposes
exports.verifyUsrAuthRole = (req, res, next) => {
    try {
        const bearerHeaderToken = typeof (req.headers['authorization']) !== 'undefined' ? req.headers['authorization'].split(' ')[1] : false;
        const usrData = jwt.verify(bearerHeaderToken, process.env.JWT_SECRET_KEY);
        if (usrData.role === "admin") {
            req.id = usrData?.userId;
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'Unauthorized Access, only Admin user can access this route !!!'
            });
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error && error?.message
        });
    }
};
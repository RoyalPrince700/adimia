const jwt = require('jsonwebtoken');

/**
 * Runs after cookie-parser + json. If JWT is missing or invalid, continues without req.userId.
 * Used so Paystack return flow can finalize orders without a session (third-party cookie issues).
 */
function optionalAuthToken(req, res, next) {
    try {
        const authHeader = req.headers?.authorization || '';
        const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
        const cookieToken = req.cookies?.token;
        const token = bearerToken || cookieToken;

        if (!token) {
            return next();
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (!err && decoded) {
                req.userId = decoded._id;
                req.userEmail = decoded.email;
            }
            next();
        });
    } catch (_err) {
        next();
    }
}

module.exports = optionalAuthToken;

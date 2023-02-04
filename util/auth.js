const jwt = require('jsonwebtoken');
const createError = require('./error');

exports.authorization = async(req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return next(createError(401, 'Unauthorized'))
        }

        jwt.verify(token, process.env.accessTokenSecret, (err, user) => {
            if (err) {
                return next(createError(403, 'Token is not valid'))
            }
            req.user = user
        })

        next();
    } catch (error) {
        next(error)
    }
}

exports.verifyUser = (req, res, next) => {
    authorization(req, res, () => {
        if (req.user._id !== req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) next(createError(403, "Token is not valid"));
        }
    })
}

exports.verifyAdmin = (req, res, next) => {
    authorization(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            if (err) next(createError(403, "Token is not valid"));
        }
    })
}
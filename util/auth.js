const jwt = require('jsonwebtoken');
const createError = require('./error');

export const authorization = async(req, res, next) => {
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

export const verifyUser = (req, res, next) => {
    authorization(req, res, () => {
        if (req.user._id !== req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) next(createError(403, "Token is not valid"));
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    authorization(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            if (err) next(createError(403, "Token is not valid"));
        }
    })
}
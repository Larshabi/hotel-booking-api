const User = require('../models/user');
const createError = require('../util/error');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const UserController = {
    async register(req, res) {
        const user = await User.create(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user
        })
    },
    async login(req, res) {
        let user = await User.findOne({ username: req.body.username });
        if (!user) { return createError(404, 'User not found') }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return createError(400, 'Incorrect Password');
        }
        user = _.pick(user, ['_id', 'email', 'isAdmin'])
        const accessToken = jwt.sign(user, process.env.accessTokenSecret, { expiresIn: process.env.accessExpiresIn });
        const refreshToken = jwt.sign(user, process.env.refreshTokenSecret, { expiresIn: process.env.refreshExpiresIn });
        const tokens = {
            accessToken,
            refreshToken
        }
        return res.cookie("access_token", accessToken, { httpOnly: true }).status(200).json({
            status: 'success',
            message: 'User Logged In successfully',
            user,
            tokens
        })
    },
    async refreshToken(req, res) {
        const payload = jwt.verify(req.body.token, process.env.refreshTokenSecret);
        if (Date.now() >= payload.exp * 1000) {
            return createError(400, 'Token Expired')
        }
        let user = await User.findOne({ _id: payload._id })
        user = _.pick(user, ['_id', 'email', 'isAdmin'])
        const tokens = {
            accessToken: jwt.sign(user, process.env.accessTokenSecret, process.env.accessTokenExpiresIn),
            refreshToken: jwt.sign(user, process.env.refreshTokenSecret, process.env.refreshTokenExpiresIn)
        }
        return res.cookie("access_token", accessToken, { httpOnly: true }).status(200).json({
            status: 'success',
            message: 'token refreshed',
            tokens,
        });
    }
}


module.exports = UserController;
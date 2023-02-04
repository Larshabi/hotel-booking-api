const User = require('../models/user');
const createError = require('../util/error');


const UserController = {
    async getUser(req, res) {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) createError(404, 'User not found')
        return res.status(200).json({
            status: 'success',
            user
        })
    },
    async getUsers(req, res) {
        const users = await User.find({})
        if (!users) {
            return res.status(200).json({
                status: 'success',
                message: 'No user registered'
            })
        }
        return res.status(200).json({
            status: 'success',
            users
        })
    },
    async updateUser(req, res) {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (!user) createError(404, 'User not found')
        return res.status(200).json({
            status: 'success',
            message: 'User successfully updated'
        })
    },
    async deleteUser(req, res) {
        const user = await User.findByIdAndRemove(req.parmas._id)
        if (!user) createError(404, 'User not found')
        return res.status(200).json({
            status: 'success',
            message: 'User successfully deleted'
        })
    }
}

module.exports = UserController;
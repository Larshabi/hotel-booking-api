const Room = require('../models/room');
const Hotel = require('../models/hotel');
const createError = require('../util/error');

const RoomController = {
    async createRoom(req, res) {
        const room = await Room.create(req.body);
        await Hotel.findByIdAndUpdate(req.params.hotelId, { $push: { rooms: room._id } });
        return res.status(200).json({
            status: 'success',
            message: 'room created',
            room
        })
    },
    async updateRoom(req, res) {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body);
        if (!room) createError(404, 'Room not found')
        return res.status(200).json({
            status: 'success',
            message: 'Room updated successfully'
        })
    },
    async getRoom(req, res) {
        const room = await Room.findById(req.parmas.id);
        if (!room) createError(404, 'Room not found');
        return res.status(200).json({
            status: 'success',
            room
        })
    },
    async getRooms(req, res) {
        const rooms = await Room.find({});
        if (!rooms) createError(404, 'Room not found');
        return res.status(200).json({
            status: 'success',
            rooms
        })
    },
    async deleteRoom(req, res) {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) createError(404, 'Room not found');
        await Hotel.findByIdAndUpdate(req.params.hotelId, { $pull: { rooms: req.params.id } })
        return res.status(200).json({
            status: 'success',
            message: 'Room deleted successfully'
        })
    },
    async roomAvailabilityUpdate(req, res) {
        let room = await room.findById(req.params.id);
        if (!room) createError(404, 'Room not found');
        room = await Room.updateOne({ _id: room._id }, { $push: { "roomNumbers.$.unavailableDates": req.body.dates } })
        return res.status(200).json({
            status: 'success',
            message: 'Room status has been updated'
        })

    }
}


module.exports = RoomController;
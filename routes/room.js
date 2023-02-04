const { Router } = require('express');
const RoomController = require('../controller/room');
const asyncHandler = require('../util/asyncHandler');
const { verifyAdmin } = require('../util/auth');

const router = Router();

router.post('/:hotelId', verifyAdmin, asyncHandler(RoomController.createRoom));

router.get('/', asyncHandler(RoomController.getRooms));

router.get('/:id', asyncHandler(RoomController.getRoom));

router.patch('/:id', verifyAdmin, asyncHandler(RoomController.updateRoom));

router.delete('/:id/:hotelId', verifyAdmin, asyncHandler(RoomController.deleteRoom));

router.patch('/rooms/availabiliy/:id', asyncHandler(RoomController.roomAvailabilityUpdate));



module.exports = router;
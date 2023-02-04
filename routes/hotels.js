const { Router } = require('express');
const HotelController = require('../controller/hotel');
const asyncHandler = require('../util/asyncHandler');
const { verifyAdmin } = require('../util/auth');

const router = Router();

router.post('/', verifyAdmin, asyncHandler(HotelController.createHotel));

router.patch('/:id', verifyAdmin, asyncHandler(HotelController.updateHotel));

router.delete('/find/:id', verifyAdmin, asyncHandler(HotelController.removeHotel));

router.get('/:id', asyncHandler(HotelController.getHotel));

router.get('/', asyncHandler(HotelController.getHotels));

router.get('/countByCity', asyncHandler(HotelController.countByCity));




module.exports = router;
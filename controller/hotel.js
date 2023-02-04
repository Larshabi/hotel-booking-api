const Hotel = require('../models/hotel');
const createError = require('../util/error');
const Room = require('../models/room')
const HotelController = {
    async createHotel(req, res) {
        let hotel = await Hotel.findOne({ name: req.body.name });
        if (hotel) {
            return createError(400, `Hotel with id ${req.params.id} already exists`);
        }
        hotel = await Hotel.create(req.body);
        return res.status(201).json({
            status: 'success',
            hotel
        })
    },
    async updateHotel(req, res) {
        const hotel = await Hotel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        if (!hotel) {
            return createError(404, `Hotel with id ${req.params.id} not found`);
        }
        return res.status(200).json({
            status: 'success',
            hotel
        })
    },
    async getHotels(req, res) {
        const { min, max, ...others } = req.query
        const hotel = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 }
        }).limit(req.query.limit);
        if (!hotel) {
            return res.status(200).json({
                status: 'success',
                message: 'No Hotel created yet'
            })
        }
        return res.status(200).json({
            status: 'success',
            hotels: hotel
        })
    },
    async getHotel(req, res) {
        const hotel = await Hotel.findOne({ _id: req.params.id })
        if (!hotel) {
            return createError(404, `Hotel with id ${req.params.id} not found`);
        }
        return res.status(200).json({
            status: 'success',
            hotel
        })
    },
    async removeHotel(req, res) {
        const hotel = await Hotel.findByIdAndRemove({ _id: req.params.id });
        if (!hotel) {
            return createError(404, `Hotel with id ${req.params.id} not found`);
        }
        return res.status(200).json({
            status: 'success',
            message: 'Hotel successfully deleted'
        })
    },
    async countByCity(req, res) {
        const cities = req.query.cities.split(",")
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }))
        return res.status(200).json({
            status: 'success',
            list
        })
    },
    async countByType(req, res) {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
        const resortCount = await Hotel.countDocuments({ type: 'resort' });
        const villaCount = await Hotel.countDocuments({ type: 'villa' });
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

        return res.status(200).json(
            [{
                    type: 'Hotel',
                    count: hotelCount
                },
                {
                    type: 'Apartment',
                    count: apartmentCount
                },
                {
                    type: 'Resort',
                    count: resortCount
                },
                {
                    type: 'Villa',
                    count: villaCount
                },
                {
                    type: 'Cabin',
                    count: cabinCount
                }
            ]
        );
    },
    async getHotelRooms(req, res) {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        return res.status(200).json({
            status: 'success',
            rooms: list
        })
    }

}

module.exports = HotelController;
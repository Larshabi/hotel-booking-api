const AuthRoute = require('./auth');
const HotelRoute = require('./hotels');
const UserRoute = require('./user');
const RoomRoute = require('./room')



module.exports = (app) => {
    app.use('api/v1/auth', AuthRoute);
    app.use('api/v1/hotel', HotelRoute);
    app.use('api/v1/user', UserRoute);
    app.use('api/v1/room', RoomRoute);
}
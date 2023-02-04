const dotenv = require('dotenv').config();
const app = require('./index');
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, options)
    .then(() => {
        console.log(`Mongoose default connection to ${process.env.MONGO_URI}`)
    });

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
})
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
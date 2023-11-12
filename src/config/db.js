const mongoose = require('mongoose');
const { dbUri } = require('../../secret');

const mongoConnect = async() => {
    try {
        mongoose.connect(dbUri);
        console.log('Database are connected');
    } catch (error) {
        console.log('Database are not Connected')
    }
}

module.exports = mongoConnect;
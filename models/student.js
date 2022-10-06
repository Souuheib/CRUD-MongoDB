const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String, default: 'sou' },
    surname: { type: String, default: 'sfaxi' },
    age: { type: Number, default: '20' }

})





module.exports = mongoose.model('Student', StudentSchema)
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    role:String
},{
    timestamps:false,
    versionKey:false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true } 
})

module.exports = mongoose.model('Roles', schema)
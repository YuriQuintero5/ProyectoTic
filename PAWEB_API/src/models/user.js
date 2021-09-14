const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userName: { type: String, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: { ref: "Roles", type: mongoose.Schema.Types.ObjectId },
    person: { ref: "People", type: mongoose.Schema.Types.ObjectId, default:null },

},{
    timestamps:false,
    versionKey:false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true } 
})

module.exports = mongoose.model('Users', schema)
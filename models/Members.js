const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    gender: { type: String, required: false },
    status: { type: Boolean, default: true },
    features: {
        height: [{ type: Number, required: false }],
        weight: [{ type: Number, required: false }],
        bodyFat: [{ type: Number, required: false }],
        waist:  [{ type: Number, required: false }],
    }
}, {
    timestamps: true,
});

const Members = mongoose.model('Members', memberSchema);

module.exports = Members;
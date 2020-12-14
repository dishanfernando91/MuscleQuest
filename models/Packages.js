const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    title: { type: String, required: true },
    fee: { type: Number, required: true },
    duration: { type: Number, required: false },
    status: { type: Boolean , default: true} 
}, {
    timestamps: true,
});

const Packages = mongoose.model('Packages', packageSchema);

module.exports = Packages;
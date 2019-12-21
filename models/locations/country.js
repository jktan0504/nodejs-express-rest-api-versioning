const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationCountrySchema = new Schema({
    location_country_code: {
        type: String,
        unique : true,
        required: true
    },
    location_country_name: {
        type: String,
        unique : true,
        required: true
    },
    location_country_currency: {
        type: String,
        required: false,
    },
    activated: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('LocationCountry', locationCountrySchema);
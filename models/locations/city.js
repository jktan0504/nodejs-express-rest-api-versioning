const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationCitySchema = new Schema({
    location_city_name: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        default: true,
    },
    location_country_id: {
        type: Schema.Types.ObjectId,
        ref: 'LocationCountry',
        required: true
    },
    location_state_id: {
        type: Schema.Types.ObjectId,
        ref: 'LocationState',
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('LocationCity', locationCitySchema);
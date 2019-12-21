const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationStateSchema = new Schema({
    location_state_name: {
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
},
{
    timestamps: true
});

module.exports = mongoose.model('LocationState', locationStateSchema);
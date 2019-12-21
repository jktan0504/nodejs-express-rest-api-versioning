const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role_name: {
        type: String,
        unique : true,
        required: true
    },
    description: {
        type: String,
        unique : true,
        required: true
    },
    prefix: {
        type: String,
        default : 'prefix',
        required: true
    },
    activated: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);
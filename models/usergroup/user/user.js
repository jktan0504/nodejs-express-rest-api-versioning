const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroupUserSchema = new Schema({
    username: {
        type: String,
    },
    first_name: {
        type: String,
        required: true
	},
	last_name: {
        type: String,
        required: true
	},
	email: {
        type: String,
		required: true,
		unique : true,
	},
	password: {
        type: String,
		required: true,
    },
    contact: {
        type: String,
    },
    contact_country: {
        type: Schema.Types.ObjectId,
        ref: 'LocationCountry',
	},
	identity_card: {
        type: String,
	},
	date_of_birth: {
        type: Date,
	},
	profile_image: {
		type: String,
		default: 'DEFAULT'
	},
	role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
		required: true,
	},
	gender: {
        type: Number, // 0 is female || 1 is male
		default: 1,
	},
	purged: {
        type: Boolean,
		default: false,
	},
	activated: {
        type: Boolean,
		default: true,
	},
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userGroupUserSchema);
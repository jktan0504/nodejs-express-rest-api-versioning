const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroupVendorSchema = new Schema({
    company_name: {
        type: String,
        required: true,
    },
    company_email: {
        type: String,
	},
	registration_id: {
        type: String,
        required: true
	},
	company_contact: {
        type: String,
		required: true,
	},
	company_contact_country: {
        type: Schema.Types.ObjectId,
        ref: 'LocationCountry',
    },
    vendor_category: {
        type: Schema.Types.ObjectId,
        ref: 'VendorCategory',
    },
    company_ssm: {
        type: String,
        default: 'DEFAULT'
	},
    company_banner: {
        type: String,
        default: 'DEFAULT'
    },
    company_logo: {
        type: String,
        default: 'DEFAULT'
	},
	commission: {
        type: Number,
        default: '0.20'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

module.exports = mongoose.model('Vendor', userGroupVendorSchema);
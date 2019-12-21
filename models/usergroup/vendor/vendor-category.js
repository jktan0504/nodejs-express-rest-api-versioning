const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorCategorySchema = new Schema({
    category_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
	},
	activated: {
        type: Boolean,
		default: true,
	},
},
{
    timestamps: true
});

module.exports = mongoose.model('VendorCategory', vendorCategorySchema);
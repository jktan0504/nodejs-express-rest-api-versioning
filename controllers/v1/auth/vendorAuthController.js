const CONSTANTS = require('../../../util/constants/contants');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const fileSystem = require('../../../util/helpers/directoryPath/fileSystem');

// TODO: CHANGE TARGET MODEL ==> ModelData
// Models ==> Vendor
const ModelData = require('../../../models/usergroup/vendor/vendor');
const User = require('../../../models/usergroup/user/user');
const Role = require('../../../models/roles/role/role');

// ** CREATE RESOURCE
// Register
exports.register  = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = new Error('Create Resource failed, entered data is incorrect.');
			error.statusCode = 422;
			throw error;
		}
		const vendorRole = await Role.findOne({ prefix: 'vendor' });
		if (!vendorRole) {
			const error = new Error('Cannot Find Role.');
			error.statusCode = 422;
			throw error;
		}

		// request input

		// Users
		const username = req.body.username;
		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const email = req.body.email;
		const password = req.body.password;
		const hashPassword = await bcrypt.hash(password, 12);
		const contact = req.body.contact;
		const contact_country = req.body.contact_country;
		const role = vendorRole._id;
		
		const newUser = new User({
			username: username,
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: hashPassword,
			contact: contact,
			contact_country: contact_country,
			role: role
		});
		const user = await newUser.save();
		// Vendor Details
		const company_name = req.body.company_name;
		const company_email = req.body.company_email;
		const registration_id = req.body.registration_id;
		const company_contact = req.body.company_contact;
		const company_contact_country = req.body.company_contact_country;
		const vendor_category = req.body.vendor_category;

		if (user != null) {
			// Profile Photo
			if (req.files != null && req.files != undefined) {
				if (Object.keys(req.files).includes("profile_image")) {
					let file = req.files.profile_image;
					let savedDirectory = `./storage/media/user/user-${user._id}/profile/`;
						
					// checkDir
					await fileSystem.createDirectory(savedDirectory);
					let savedPath = `${savedDirectory}${file.name}`;
					// Use the mv() method to place the file in upload directory (i.e. "uploads")
					await file.mv(savedPath);
						
					user.profile_image = `${CONSTANTS.API_DOMAIN}${savedPath.substr(1)}`;
					await user.save();
				}
			}		
			
				
			const token = jwt.sign(
				{
					email: user.email,
					id: user._id.toString()
				},
				`${CONSTANTS.SECRET_KEY}`,
				{ expiresIn: '365 days' }
			);
			const newModelData = new ModelData({
				user: user._id,
				company_name: company_name,
				company_email: company_email,
				registration_id: registration_id,
				company_contact: company_contact,
				company_contact_country: company_contact_country,
				vendor_category: vendor_category
			});

			let result = await newModelData.save();
				
			let vendorData = await ModelData.find({ 
				_id: newModelData._id
			})
				.populate('user')
				.exec();
						
			// Media File
			if (result != null) {

				// Company Logo 
				if (req.files != null && req.files != undefined) {
					if (Object.keys(req.files).includes("company_logo")) {
						let file = req.files.company_logo;
						let savedDirectory = `./storage/media/vendor/vendor-${result._id}/companylogo/`;	
						
						// checkDir
						await fileSystem.createDirectory(savedDirectory);
						let savedPath = `${savedDirectory}${file.name}`;
						// Use the mv() method to place the file in upload directory (i.e. "uploads")
						await file.mv(savedPath);
								
						result.company_logo = `${CONSTANTS.API_DOMAIN}${savedPath.substr(1)}`;
						await result.save();
					}
				}

				// Company Banner 
				if (req.files != null && req.files != undefined) {
					if (Object.keys(req.files).includes("company_banner")) {
						let file = req.files.company_banner;
						let savedDirectory = `./storage/media/vendor/vendor-${result._id}/companybanner/`;
										
						// checkDir
						await fileSystem.createDirectory(savedDirectory);
						let savedPath = `${savedDirectory}${file.name}`;
						// Use the mv() method to place the file in upload directory (i.e. "uploads")
						await file.mv(savedPath);
										
						result.company_banner = `${CONSTANTS.API_DOMAIN}${savedPath.substr(1)}`;
						await result.save();
					}
				}

				// Company Banner 
				if (req.files != null && req.files != undefined) {
					if (Object.keys(req.files).includes("company_ssm")) {
						let file = req.files.company_ssm;
						let savedDirectory = `./storage/media/vendor/vendor-${result._id}/companyssm/`;
								
						// checkDir
						await fileSystem.createDirectory(savedDirectory);
						let savedPath = `${savedDirectory}${file.name}`;
						// Use the mv() method to place the file in upload directory (i.e. "uploads")
						await file.mv(savedPath);
									
						result.company_ssm = `${CONSTANTS.API_DOMAIN}${savedPath.substr(1)}`;
						await result.save();
					}
				}
		
				//send response
				res.send({
					status: true,
					token: token,
					message: 'Vendor Sign Up Successfully',
					data: vendorData
				});
			}
			else {
				//send response
				res.send({
				status: true,
					token: token,
					message: 'Vendor Sign Up Successfully',
					data: vendorData
				});
			}
		}
	}
	catch(error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
 	}
};

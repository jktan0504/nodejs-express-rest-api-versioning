const CONSTANTS = require('../../../util/constants/contants');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// TODO: CHANGE TARGET MODEL ==> ModelData
// Models ==> LocationState
const ModelData = require('../../../models/locations/state');

// ** GET RESOURCE
// INDEX 
exports.index = async (req, res, next) => {
    const reqCountryId = req.query.location_country_id;

    const currentPage = +req.query.page || 1;
    const perPage = +req.query.per_page;
    try {
        const totalItems = await ModelData.find({ location_country_id: reqCountryId }).countDocuments();
        let listOfResource = await ModelData.find({ location_country_id: reqCountryId })
            .populate('location_country_id')
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        
        const lastPage = Math.ceil(totalItems/perPage);
        const previousPage = currentPage - 1  > 0 ? currentPage - 1 : 1;
        const nextPage = currentPage + 1  <= lastPage ? currentPage + 1 : currentPage;

        res.status(200).json({
            data: listOfResource,            
            meta: {
                current_page: currentPage,
                from: previousPage,
                last_page: lastPage,
                path: `${CONSTANTS.API_DOMAIN}/api/v1/location/state/get`,
                per_page: perPage,
                to: nextPage,
                total: totalItems
            },
            totalItems: totalItems,
            length: perPage,
            page: currentPage,
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// ** GET SPECIFIC RESOURCE
// SHOW 
exports.show = async (req, res, next) => {
    try {
        const id = req.params.Id;
        let foundModelData = await ModelData.findById(id);

        if (!foundModelData) {
            const error = new Error('Unable To Find Resource');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            data: foundModelData,            
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// ** CREATE RESOURCE
// CREATE
exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Create Resource failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }

        // request input
        const location_state_name = req.body.location_state_name;
        const location_country_id = req.body.location_country_id;
        const activated = req.body.activated;

        const newModelData = new ModelData({
            location_state_name: location_state_name,
            location_country_id: location_country_id,
            activated: activated
        });

        const result = await newModelData.save();

        res.status(201).json({
            message: 'Create Resource Successfully',
            data: result,
        });
    }
    catch(error) {
        // console.log(error);
        // let errorMessage = error.errmsg ? error.errmsg : error._message;
        // res.status(422).json({
        //     message: errorMessage
        // });
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

// ** UPDATE RESOURCE
// UPDATE
exports.update = async (req, res, next) => {
    try {
        const id = req.params.Id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Update Resource failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }

        let foundModelData = await ModelData.findById(id);

        if (!foundModelData) {
            const error = new Error('Unable To Find Resource');
            error.statusCode = 404;
            throw error;
        }

        // UPDATE HERE
        var update={};
        update[req.body.field]=req.body.value;
        foundModelData.updateOne(
            {
                "_id": foundModelData._id,
                "location_state_name": req.body.location_state_name,
                "location_country_id": req.body.location_country_id,
                "activated": req.body.activated,
            },
            {$set:{update}},
            function (err,success) {
                if(err) return next(err);
                res.status(201).json({
                    message: 'Update Resource Successfully',
                    data: foundModelData,
                });
            }
        )
    }
    catch(error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

// ** DELETE RESOURCE
// delete
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.Id;
        let foundModelData = await ModelData.findById(id);

        if (!foundModelData) {
            const error = new Error('Unable To Find Resource');
            error.statusCode = 404;
            throw error;
        }
        await foundModelData.findByIdAndRemove(id);
        res.status(202).json({
            message: 'Deleted successfully.',
            data: foundModelData
        });
    }
    catch(error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


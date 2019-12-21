const CONSTANTS = require('../../../../util/constants/contants');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// TODO: CHANGE TARGET MODEL ==> ModelData
// Models ==> VendorCategory
const ModelData = require('../../../../models/usergroup/vendor/vendor-category');

// ** GET RESOURCE
// INDEX 
exports.index = async (req, res, next) => {
    const currentPage = +req.query.page || 1;
    const perPage = +req.query.per_page;
    try {
        const totalItems = await ModelData.find().countDocuments();
        const listOfResource = await ModelData.find()
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
                path: `${CONSTANTS.API_DOMAIN}/api/v1/roles/role/get`,
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
        const category_name = req.body.category_name;
        const description = req.body.description;
        const activated = req.body.activated;

        const newModelData = new ModelData({
            category_name: category_name,
            description: description,
            activated: activated,
        });

        const result = await newModelData.save();

        res.status(201).json({
            message: 'Create New Resource Successfully',
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
                "category_name": req.body.category_name,
                "description": req.body.description,
                "activated": req.body.activated
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
        await ModelData.findByIdAndRemove(id);
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


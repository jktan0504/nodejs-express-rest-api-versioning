exports.signUp = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'User Sign Up successfully.',
        });
    }
    catch(error) {
        console.log(error);
    }
};


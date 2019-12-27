// import require library & modules
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

// Routes
const apiRoutes = require('./routes/api/api');

const API_ROUTE = 'api';

// configure settings -- body
app.use(bodyParser.json()); // application/json // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// FileUpload Handlers
// default options
app.use(fileUpload({
    createParentPath: true
}));
app.use('/storage', express.static(path.join(__dirname, 'storage')));

// Views
// Welcome || Introduction Page
// app.use('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'views', 'v1.html'));
//     next();
// });

// API SUCCESS
app.use('/api', apiRoutes);

// API ERROR - MIDDLEWARE
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// App Listener - by using Mongoose
mongoose
    .connect(
        'mongodb+srv://jktan_pf:uk8MLVQIsQ32q5wI@jk-dev-zgem1.mongodb.net/test?retryWrites=true&w=majority',
        {   useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: true
        }
    )
    .then(result => {
        app.listen(8500);
    })
    .catch(
        err => {console.log(`ERROR FOUND IN MONGOOSE: ===> ${err}`);}
    );

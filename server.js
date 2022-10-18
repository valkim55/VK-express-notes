// setup a server to accept incoming requests, request express
const express = require('express');
// require path to call multiple files across the project
const path = require('path');
// instantiate the server
const app = express();
// setup a route for the front end to request data from
const notes = require('./db/notes.json')


// init a body parsing middleware to handle raw json data, form submissions and other deeply nested data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// add a middleware to make 'public' directory static so styling and functionality could ba accessed too
app.use(express.static(path.join(__dirname, 'public')));


// points at all API routes in APIroutes directory, to perform actions on notes.json 
app.use('/', require('./routes/APIroutes/notesRoutes'));

// points at all routes in HTMLroutes directory for the front end
app.use('/', require('./routes/HTMLroutes/HTMLroutes'));


//setup a port, the server will be on Heroku but but as a backup we'll use 3001
const PORT = process.env.PORT || 3001;
//listen for requests
app.listen(PORT, () => {
    console.log(`API server is on ${PORT}`);
})
// setup a server to accept incoming requests, request express
const express = require('express');
// require path to call multiple files across the project
const path = require('path');
// instantiate teh server
const app = express();

// setup a route for the front end to request data from
const {notes} = require('./db/db.json')

// init a body parsing middleware to handle raw json data
app.use(express.json());
// init a middleware to handle form submissions
app.use(express.urlencoded({extended:true}));
// add a middleware to make 'public' directory static
//app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.send('hi potato');
    //res.send(notes);
    
});














//setup a port, th server will be on Heroku but but as a backup we'll use 3001
const PORT = process.env.PORT || 3001;

//listen for requests
app.listen(PORT, () => {
    console.log(`API server is on ${PORT}`);
})
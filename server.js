// Import necessary modules
const express = require('express'); // Web framework for Node.js
const path = require('path'); // Module for handling file paths
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const app = express(); // Create an Express application
const port = 3000; // Define the port for the server

// Middleware to parse URL-encoded data (from forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Welcome message route (GET request to root)
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying'); // Send welcome message
});

// Serve the index.html file when the /index route is accessed
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send the index.html file
});

// Error handling middleware for catching errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Something went wrong!'); // Send a 500 error response
});

// Route with a single URL parameter (name)
app.get('/hello/:name', (req, res) => {
    const name = req.params.name; // Extract the name from URL parameters
    res.send(`Hello ${name}`); // Send greeting message
});

// Route with two URL parameters (firstName and lastName)
app.get('/hello/:firstName/:lastName', (req, res) => {
    const { firstName, lastName } = req.params; // Destructure firstName and lastName from URL parameters
    res.send(`Hello ${firstName} ${lastName}`); // Send greeting message
});

// Movies route returning a JSON response
app.get('/api/movies', (req, res) => {
    // Array of movie objects
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(200).json({ myMovies }); // Send movies as JSON response
});

// Handle GET request for /name (using query parameters)
app.get('/name', (req, res) => {
    const firstname = req.query.firstname; // Extract firstname from query parameters
    const lastname = req.query.lastname; // Extract lastname from query parameters
    res.send(`Hello ${firstname} ${lastname}`); // Send greeting message
});

// Handle POST request for /name (using body parameters)
app.post('/name', (req, res) => {
    const firstname = req.body.firstname; // Extract firstname from request body
    const lastname = req.body.lastname; // Extract lastname from request body
    res.send(`Hello ${firstname} ${lastname}`); // Send greeting message
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log server URL
});

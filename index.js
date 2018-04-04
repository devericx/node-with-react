const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI);

// set up database models
require('./models/User');

// set up services
require('./services/passport');

const app = express();

// set up routes
require('./routes/authRoutes')(app);

app.listen(PORT);

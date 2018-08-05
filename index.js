const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI);

const app = express();

// set up middleware
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set up database models
require("./models/User");

// set up services
require("./services/passport");

// set up routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

app.listen(PORT);

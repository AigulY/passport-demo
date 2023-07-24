const bcrypt = require('bcryptjs');
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passportConfig');
const authMiddleware = require('./middleware/auth');
const setCurrentUserMiddleware = require('./middleware/setCurrentUser');
const routes = require('./routes/auth');
const mongoDb = process.env.MONGO_URI;
const MongoDBStore = require('connect-mongodb-session')(session)
//require("express-async-errors");

var store = new MongoDBStore({
  uri: mongoDb,
  collection: 'Testsession'
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

//app.set("/views", __dirname);
app.set('views', path.join(__dirname, 'views/pages'));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(setCurrentUserMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const start = async () => {
  try {
    await connectDB(mongoDb);
    app.listen(3000, () => console.log(`App listening on port 3000!`));
  } catch (err) {
    console.log(err);
  }
};

start();
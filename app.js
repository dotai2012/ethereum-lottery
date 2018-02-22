const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const database = require('./config/database');
const bluebird = require('bluebird');
const compression = require('compression');

mongoose.Promise = bluebird;
mongoose.connect(database.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});

const app = express();
const port = process.env.port || 80;

app.use(compression({ level: 9 }));
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const user = require('./route/user');

app.use('/user', user);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port, () => {
  console.log('Server Started');
});

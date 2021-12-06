const mongoose = require('mongoose');
require('express-async-errors')
const students = require('./routes/students');
const post = require('./routes/post');
const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middleware/error')
const app = express();
require('./startup/prod')(app);
require('dotenv').config();
;
app.use(bodyParser.urlencoded({extended: false}))




mongoose.connect("mongodb+srv://mustafa12:HF8IsHbY3LnOTBtt@cluster0.lsyhq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => console.log('Connected to Heroku MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/students', students);
app.use('/post', post);

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
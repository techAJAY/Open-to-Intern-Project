const express = require('express')

const bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://gtgaurav:Wp2gKNWXbHDifb5n@cluster0.9p9yl.mongodb.net/ajay111-DB", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on cluster'))
    .catch(err => console.log(err))

app.use('/', route);




app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
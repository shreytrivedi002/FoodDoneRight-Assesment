var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var customersRoute = require('./routes/customers');
var cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/customers', customersRoute)

app.use('/', (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
})

module.exports = app;
const express = require('express');
const app = express();
const swig = require('swig');
const morgan = require('morgan');
const path = require('path');

app.set('port',3000);
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));
swig.setDefaults({
    cache:false
})

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(require('./router/router'))

module.exports = app;
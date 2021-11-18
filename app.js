const express = require('express');
const app = express();
// const indexRouter = require('./src/routes/index.router');
const lkRouter = require('./src/routes/lk.router');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, 'public')));

// app.use('/', indexRouter);
app.use('/lk', lkRouter);

app.listen(PORT, () => console.log(`Vse ok na ${PORT}`));

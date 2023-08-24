const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authMiddleware = require('./middleware/authMiddleware');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const db = require('./models');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// db.sequelize.sync({force:true});

// db.sequelize.sync();


app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {

    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});



module.exports = app;

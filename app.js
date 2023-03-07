const express = require('express');
var createError = require('http-errors');
require('./passport');
const passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const LocalStrategy = require("passport-local").Strategy;
const compression = require("compression");
var cors = require('cors')
const { body, validationResult } = require("express-validator");
//router and controller
const controller = require("./controllers/controller");
//monogo connection
mongoose.set('strictQuery', false);
const mongoDb = "mongodb+srv://jasonsu92y:jason789523@cluster0.xqgtijc.mongodb.net/piano_club_server?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const Box = require("./models/box");
const { doesNotMatch } = require('assert');
const app = express();

// parse application/x-www-form-urlencoded

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use(compression()); // Compress all routes
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//route
const populate = (req, res) => {
    var arr = [];
    for (var i = 0; i < 882; i++) {
        arr.push("Available");
    }
    for (var i = 0; i < 882; i++) {
        arr.push("");
    }
    const box = new Box({
        name: "reservationData",
        data: arr
    }).save(err => {
        if (err) {
            console.log(err);
        }
    });
    res.send("populated");
}


var router = express.Router();
app.use('/', router);
router.post('/Login', controller.LoginPost)
router.post('/SignUp', controller.SignUpPost)
router.get('/Reserve', passport.authenticate('jwt', { session: false }), controller.ReserveGet)
router.post('/Reserve', passport.authenticate('jwt', { session: false }), controller.ReservePost)
router.get('/Populate', populate)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(5000, () => console.log("server start on 5000"));
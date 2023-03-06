const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Box = require("../models/box");

exports.LoginPost = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
};

exports.SignUpPost = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hasshedPassword) => {
        if (err) {
            return next(err);
        } else {
            const user = new User({
                username: req.body.username,
                password: hasshedPassword,
                email: req.body.email,
                department: req.body.department,
                studentID: req.body.studentID,
                role: req.body.role,
            }).save(err => {
                if (err) {
                    return next(err);
                }
                const token = "success";
                res.json({ user, token });
            });
        }
    });
};

exports.ReserveGet = (req, res) => {
    Box.findOne()
        .exec((err, listBox) => {
            if (err) {
                return next(err);
            }
            res.json(listBox);
        })
};

exports.ReservePost = (req, res) => {
    //might be array.map's issue
    func = async () => {
        const name = (req.body.mode == "Reserve") ? req.body.name : ""
        const state = (req.body.mode == "Reserve") ? "Occupied" : "Available"
        const box = await Box.findOne()
        var updateData = await box.data.map((element, index) => {
            if (index == req.body.index) {
                element = state;
            }
            if (index == req.body.index + 882) {
                return element = name;
            }
        })
        Box.findOneAndUpdate({}, updateData)
        res.json({ "messege": "success" });
    }
    func().catch(error => {
        console.error('There was an error!', error);
    });
};
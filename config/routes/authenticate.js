var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Node-API');

var User = require('./../../app/models/user');

router.route('/authenticate')
    .post(function(req, res) {
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) { //User with name found
                // Check if password match
                if (user.password != req.body.password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    var token = jwt.sign(user, 'ilovescotchyscotch', {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });

                }

            }
        })


    });

module.exports = router;

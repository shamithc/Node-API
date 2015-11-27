var express = require('express');

var router = express.Router();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Node-API');

var User = require('./../../app/models/user');

// Create a user
router.route('/setup')
    .get(function(req, res) {
        var nick = new User({
            name: 'Nick Cerminara',
            password: 'password',
            admin: true
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({
                success: true
            });
        });
    });

// Get all users /api/users
router.route('/')
    .get(function(req, res) {
        User.find({}, function(err, users) {
            res.json(users)
        })
    });


module.exports = router;

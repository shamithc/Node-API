var express = require('express');
var router = express.Router(); // get an instance of the express Router



var Bear = require('./../../app/models/bear');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.route('/')
    .post(function(req, res) {

        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)

        console.log(req.body)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Bear created!'
            });
        });

    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


router.route('/:bear_id')
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

            bear.name = req.body.name;
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Bear updated!'
                });
            });
        });
    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });

    });

module.exports = router;

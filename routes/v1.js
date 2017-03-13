/**
 * Created by garry on 17/3/10.
 */
var express = require('express');

var router = express.Router();

module.exports = router;

router.get('/query', (req, res)=> {
    res.send('query');
});

router.post('/update', (req, res)=> {
    res.send('update');
});

router.get('/', (req, res, next)=> {
    var i = 0;
    while (i < 10000) {
        i += ++i;
    }

    res.data = i;
    next();
});


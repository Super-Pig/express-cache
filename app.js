/**
 * Created by garry on 17/3/10.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');
var cache = require('./cache')({
    redis_host: config.REDIS_TCP_ADDR,
    redis_port: config.REDIS_TCP_PORT,
    db: 15
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cache.in);

app.use('/', require('./routes/v1'));

app.use(cache.out);

app.listen(config.PORT, ()=> {
    console.log('menpiao app listening at port %s', config.PORT);
});
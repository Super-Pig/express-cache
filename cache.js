/**
 * Created by garry on 17/3/10.
 */

var redis = require('@boluome/redis');
var hash = require('@boluome/hash');

var genKey = req=> {
    var keyStr = `${req.path}`;
    Object.keys(req.query).sort().forEach(k=>keyStr += k + req.query[k]);
    return hash.sha1(keyStr);
};

module.exports = redisConfig=> {
    const redisClient = redis.getInstance(redisConfig.redis_host, redisConfig.redis_port, redisConfig.db);

    return {
        'in': (req, res, next)=> {
            if (req.method == 'GET') {
                var key = genKey(req);

                redisClient.get(key, (err, result)=> {
                    if (result) {
                        return res.json(JSON.parse(result));
                    } else {
                        next('route');
                    }
                });
            } else {
                next();
            }
        },
        'out': (req, res, next)=> {
            if (req.method == 'GET') {
                var key = genKey(req);

                redisClient.set(key, JSON.stringify(res.data), err=> {
                    return res.json(res.data);
                });
            } else {
                next();
            }
        }
    }
};

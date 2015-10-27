var path = require('path');

module.exports = function aboutUs(express) {

    var router = express.Router();
    var ip;

    router.get('/', function (req, res, next) {


    });

    return {router: router, ip: ip};

};

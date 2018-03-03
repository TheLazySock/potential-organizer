var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());

router.use(require('./signup'));
router.use(require('./login'));

module.exports = router
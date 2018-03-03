var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());

router.use(require('./frontpage'));
router.use(require('./login'));
router.use(require('./signup'));
router.use(require('./todo'));


module.exports = router
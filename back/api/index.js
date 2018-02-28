var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json())

router.use(require('./signup'))
router.use(require('./login'))
router.use(require('./account'))

module.exports = router
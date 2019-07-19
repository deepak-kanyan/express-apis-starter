const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const isAuthorized = require('../middlewares/isAuthorized')
router.get('/', isAuthorized, userController.index);
module.exports = router;
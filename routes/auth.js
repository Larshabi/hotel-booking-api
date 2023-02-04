const { Router } = require('express');
const asyncHandler = require('../util/asyncHandler');
const AuthController = require('../controller/auth')

const router = Router();


router.post('/register', asyncHandler(AuthController.register));

router.post('/login', asyncHandler(AuthController.login))

module.exports = router;
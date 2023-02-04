const { Router } = require('express');
const UserController = require('../controller/user');
const asyncHandler = require('../util/asyncHandler');
const { authorization, verifyUser, verifyAdmin } = require('../util/auth');

const router = Router();

router.get('/', verifyAdmin, asyncHandler(UserController.getUsers));

router.get('/id', verifyUser, asyncHandler(UserController.getUser));

router.patch('/:id', verifyUser, asyncHandler(UserController.updateUser));

router.delete('/:id', verifyUser, asyncHandler(UserController.deleteUser));



module.exports = router;
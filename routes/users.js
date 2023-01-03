const router = require('express').Router();
const { getUsers, getUserID, createUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserID);

router.post('/users', createUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
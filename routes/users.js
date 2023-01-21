const router = require('express').Router();
const {
  getUsers, getUserID, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');
const { validationGetUserID, validationUpdateProfile, validationUpdateAvatar } = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/me', getProfile);

router.get('/users/:userId', validationGetUserID, getUserID);

router.patch('/users/me', validationUpdateProfile, updateProfile);

router.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;

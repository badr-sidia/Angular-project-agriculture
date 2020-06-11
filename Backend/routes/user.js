const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/:id',userCtrl.getSingleUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
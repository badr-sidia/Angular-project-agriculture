const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const optionCtrl = require('../controllers/option');

router.get('/:id',optionCtrl.getAllOptions)
router.post('/', /*auth,*/ multer,optionCtrl.createOption);



module.exports = router;
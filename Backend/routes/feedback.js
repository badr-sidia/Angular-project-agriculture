const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const contactCtrl = require('../controllers/feedback');


router.post('/', /*auth,*/ multer,contactCtrl.createFeedback);


module.exports = router;
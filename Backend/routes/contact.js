const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const contactCtrl = require('../controllers/contact');


router.post('/', /*auth,*/ multer,contactCtrl.createContact);


module.exports = router;
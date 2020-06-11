const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const serviceCtrl = require('../controllers/service');


router.get('/', /*auth, */serviceCtrl.getAllService);
router.post('/'/*auth*/,multer,serviceCtrl.createService);

router.get('/:id', /*auth, */serviceCtrl.getOneService);
router.delete('/:id', /*auth, */serviceCtrl.deleteService);
module.exports = router;
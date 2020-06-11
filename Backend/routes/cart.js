const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const cartCtrl = require('../controllers/cart');


router.get('/', /*auth, */cartCtrl.getAllCarts);
router.post('/', /*auth,*/ multer,cartCtrl.createCart);
router.put('/:id', /*auth,*/multer, cartCtrl.modifyCart);
module.exports = router;
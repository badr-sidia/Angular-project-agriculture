const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const buysCtrl = require('../controllers/buys');


router.get('/',buysCtrl.getAllBuys)

router.get('/somme',buysCtrl.getBySomme)
router.get('/stotal',buysCtrl.getBySprice)
router.get('/date',buysCtrl.getByDate)
router.get('/:id',buysCtrl.getSingleBuy)
router.post('/', /*auth,*/ multer,buysCtrl.createBuys);

module.exports = router;
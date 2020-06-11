const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');


router.get('/', /*auth, */stuffCtrl.getAllStuff);
router.get('/stuffid', /*auth, */stuffCtrl.getAllStuffid);
router.post('/', /*auth,*/ multer,stuffCtrl.createThing);
router.get('/:id', /*auth, */stuffCtrl.getOneThing);
router.get('/price/:price', /*auth, */stuffCtrl.getThingHprice);
router.get('/priceL/:price', /*auth, */stuffCtrl.getThingLprice);
router.get('/type/:type', /*auth, */stuffCtrl.getOneThingbytype);
router.get('/:status', /*auth, */stuffCtrl.getOneThingbystatus);
router.get('/qualite/:qualite/:type', /*auth, */stuffCtrl.getOneThingbyqu);
router.put('/:id', /*auth,*/multer, stuffCtrl.modifyThing);
router.delete('/:id', /*auth, */stuffCtrl.deleteThing);


module.exports = router;
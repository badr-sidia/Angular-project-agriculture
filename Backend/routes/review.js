const express = require('express');

const multer = require('../middleware/multer-config');
const router = express.Router();
const reviewCtrl = require('../controllers/review');


router.post('/', /*auth,*/ multer,reviewCtrl.createReview);
router.get('/star',reviewCtrl.getThingbyrating);
router.get('/:id', /*auth, */reviewCtrl.getReviewByid);

module.exports = router;
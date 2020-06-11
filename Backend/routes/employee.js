const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const optionCtrl = require('../controllers/employee');

router.get('/:id',optionCtrl.getAllEmployees)
router.get('/single/:id',optionCtrl.getSingleEmployee)
router.get('/',optionCtrl.getFeaturedEmployee)
router.post('/', /*auth,*/ multer,optionCtrl.createEmployee);
router.delete('/:id', /*auth, */optionCtrl.deleteEmployee);


module.exports = router;
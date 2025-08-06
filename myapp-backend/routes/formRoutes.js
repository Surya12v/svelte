// routes/formRoutes.js
const express = require('express');
const router = express.Router(); 
const formController = require('../controllers/formController');

router.post('/', formController.createForm);
router.get('/', formController.getForms);
router.get('/:id', formController.getForms);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);

module.exports = router;

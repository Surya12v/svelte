// routes/formRoutes.js
const express = require('express');
const router = express.Router(); 
const formController = require('../controllers/formController');

router.post('/', formController.createForm);
router.get('/', formController.getForms);
router.get('/search', formController.getForms); // Assuming you want to handle search queries
router.get('/:id', formController.getForm);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);

module.exports = router;

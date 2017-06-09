//contacts.js
'use strict';

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.param('contactId', contactController.findById);

router.post('/contacts', contactController.create);
router.get('/contacts', contactController.getAll);
router.get('/contacts/:contactId', contactController.getOne);
router.put('/contacts/:contactId', contactController.update);
router.delete('/contacts/:contactId', contactController.remove);

module.exports = router;
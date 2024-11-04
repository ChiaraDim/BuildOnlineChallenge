const express = require('express');
const router = express.Router();
const contactController = require('../src/controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/contacts', authMiddleware, contactController.getAllContacts);

module.exports = router;
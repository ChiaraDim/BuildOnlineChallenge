const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/contacts', authMiddleware, contactController.postContact);

module.exports = router;
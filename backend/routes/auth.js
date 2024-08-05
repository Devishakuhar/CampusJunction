const express = require('express');
const { registerUser, verifyAccount, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyAccount);
router.post('/login', loginUser);

module.exports = router;

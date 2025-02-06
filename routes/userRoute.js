const express = require('express');
const router = express.Router();
const {protect} = require('../mwares/authMiddleware');
const {
    register,
    login,
    forgotPassword
} = require('../controllers/userController.js');

router.post("/regisztracio", register);
router.post("/login", login);
router.post("/forgotpass", forgotPassword);


module.exports = router
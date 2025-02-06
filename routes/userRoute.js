const express = require('express');
const router = express.Router();
const {protect} = require('../mwares/authMiddleware');
const {
    register,
    login,
    update
} = require('../controllers/userController.js');

router.post("/regisztracio", register);
router.post("/login", login);
router.patch("/update", update);


module.exports = router
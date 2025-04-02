const express = require('express');
const router = express.Router();
const {protect} = require('../mwares/authMiddleware');
const {
    register,
    login,
    forgotPassword,
    imgUplad,
    getImg,
    getUserByToken
} = require('../controllers/userController.js');

router.post("/regisztracio", register);
router.post("/login", login);
router.post("/forgotpass", forgotPassword);
router.post("/imgupload", protect, imgUplad);
router.get("/getimg", protect, getImg);
router.get("/getuserbytoken", protect, getUserByToken);


module.exports = router
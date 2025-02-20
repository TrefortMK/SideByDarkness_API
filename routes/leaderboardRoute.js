const express = require('express');
const router = express.Router();
const {
    getAllUser
} = require('../controllers/leaderboardController.js');

router.get("/alluser", getAllUser);


module.exports = router
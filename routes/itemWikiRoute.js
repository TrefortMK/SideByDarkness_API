const express = require("express");
const cors = require("cors");
const router = require("./userRoute");
const { getAllItem } = require("../controllers/itemWikiController");



router.get("/allitem", getAllItem)

module.exports = router
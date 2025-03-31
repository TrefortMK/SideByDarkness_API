const express = require("express");
const cors = require("cors");
const router = require("./userRoute");
const { getAllItem } = require("../controllers/itemWikiController");
const app = express();

app.use(cors())
app.use(express.json())

router.get("/allitem", getAllItem)
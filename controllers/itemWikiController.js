const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json())
//kép megjelenítése item neve item tulajdonsága
//4 táblás lekérdezés item, item buff, item debuff, base stat
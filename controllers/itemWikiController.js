const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json())
//kép megjelenítése item neve item tulajdonsága
//4 táblás lekérdezés item, item buff, item debuff, base stat

const getAllItem = async (req, res) => {
    const allitem = await prisma.item.findMany()
    const allweapon = await prisma.weapon.findMany()
    res.json(allitem,allweapon)
}

module.exports = {
    getAllItem
}
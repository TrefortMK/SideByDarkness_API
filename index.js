const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require('./routes/userRoute'));

const PORT = 8000;

app.listen(PORT, () => {
    console.log("Fut a szerver")
});

app.get("/", (req, res) => {
    res.json({ message: "Felhasznalok projekt" });
});
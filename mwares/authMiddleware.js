const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const idFromToken = jwt.verify(token, "szupertitkostitok").id;

            req.user = await prisma.player.findFirst({
                where: {
                    player_id: idFromToken
                }
            });

            next();
        } catch (error) {
            return res.status(401).json({ message: "Jelentkezzen be!" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Jelentkezzen be!" });
    }
}

module.exports = {
    protect
}
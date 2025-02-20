const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

module.exports = {
    getAllUser
};

const jwt = require('jsonwebtoken')
const argon2 = require('argon2');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const generateToken = (id) => {
    return jwt.sign({ id }, "szupertitkostitok", { expiresIn: "1d" });
}

const register = async (req, res) => {
    const { email, username, password } = req.body

    // adat validáció
    if (!email || !username || !password) {
        return res.json({ message: "Hiányos adatok!" });
    }

    const user = await prisma.player.findFirst({
        where: {
            email: email
        }
    });

    if (user) {
        return res.json({ message: "Email-cím már használatban!" });
    }

    // password hash --> titkosítjuk a jelszót
    const hash = await argon2.hash(password);

    const newUser = await prisma.player.create({
        data: {
            email: email,
            username: username,
            password: hash,
            profile_picture: null,
            best_runtime: null,
            best_score: null,
            savedata: null,
            playtime: null
        }
    });

    res.json({
        message: "Sikeres regisztráció!",
        newUser
    });
}

const login = async (req, res) => {
    const { email, password } = req.body
    // procedurális email validálás
    if (!email || !password) {
        return res.json({
            message: "Hiányzó adatok!"
        });
    }
    const user = await prisma.player.findFirst({
        where: {
            email: email
        }
    });


    //if(!user) return res.json({message: "Nem létező fiók!"});

    if (!user) {
        return res.json({
            message: "Nem létező fiók!"
        });
    }


    //passMatch ? res.json({message: "Sikeres bejelentkezés!"}): res.json({message: "Helytelen jelszó!"})
    const passMatch = await argon2.verify(player.password, password);

    if (passMatch) {
        // token --> hitelesítő eszköz --> kulcs
        const token = generateToken(player.id)
        return res.json({
            message: "Sikeres bejelentkezés!",
            username: player.username,
            token
        })
    } else {
        return res.json({
            message: "Helytelen jelszó!"
        });
    }
}
const forgotPassword = async (req, res) => {
    const { email, password, newPassword } = req.body
    // procedurális email validálás
    if (!email || !password || !newPassword) {
        return res.json({
            message: "Hiányzó adatok!"
        });
    }
    const user = await prisma.player.findFirst({
        where: {
            email: email
        }
    });


    //if(!user) return res.json({message: "Nem létező fiók!"});

    if (!user) {
        return res.json({
            message: "Nem létező fiók!"
        });
    }


    //passMatch ? res.json({message: "Sikeres bejelentkezés!"}): res.json({message: "Helytelen jelszó!"})
    const passMatch = await argon2.verify(user.password, password);

    const hash = await argon2.hash(newPassword);

    if (passMatch) {
        // token --> hitelesítő eszköz --> kulcs
        
        const updateUser = await prisma.player.update({
            where: {
                id: player.id,
                email: email,
            },
            data: {
                password: hash,
            },
        })

        res.json({
            message: "Sikeres jelszóváltozatás",
            updateUser
        });

    } else {
        return res.json({
            message: "rossz a jelszo"
        });
    }
}

module.exports = {
    register,
    login,
    forgotPassword
}


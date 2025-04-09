const jwt = require('jsonwebtoken')
const argon2 = require('argon2');
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
var isValidEmail = require('is-valid-email');

const generateToken = (id) => {
    return jwt.sign({ id }, "szupertitkostitok", { expiresIn: "1d" });
}

const register = async (req, res) => {
    const { email, username, password } = req.body

    // adat validáció
    if (!email || !username || !password) {
        return res.status(400).json({ message: "Hiányos adatok!" });
    }

    if (!isValidEmail(email))
        return res.status(422).json({ message: "Az email-cím nem helyes!" });

    const user = await prisma.player.findFirst({
        where: {
            email: email
        }
    });

    if (user) {
        return res.status(409).json({ message: "Email-cím már használatban!" });
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
        return res.status(404).json({
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
        return res.status(404).json({
            message: "Nem létező fiók!"
        });
    }


    //passMatch ? res.json({message: "Sikeres bejelentkezés!"}): res.json({message: "Helytelen jelszó!"})
    const passMatch = await argon2.verify(user.password, password);

    if (passMatch) {
        // token --> hitelesítő eszköz --> kulcs
        const token = generateToken(user.player_id)
        return res.json({
            message: "Sikeres bejelentkezés!",
            username: user.username,
            token
        })
    } else {
        return res.status(401).json({
            message: "Helytelen jelszó!"
        });
    }
}
const forgotPassword = async (req, res) => {
    const { email, password, newPassword } = req.body
    // procedurális email validálás
    if (!email || !password || !newPassword) {
        return res.status(404).json({
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
        return res.status(404).json({
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
                player_id: user.player_id,
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
        return res.status(401).json({
            message: "Helytelen jelszó!"
        });
    }
}

function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

const imgUplad = async (req, res) => {
    const { img } = req.body;
    const user = req.user;

    if (!img) {
        return res.status(404).json({
            message: "Hiányzó adatok!"
        });
    }

    if (!user) {
        return res.status(404).json({
            message: "Nem létező fiók!"
        });
    } else {

        const updateUser = await prisma.player.update({
            where: {
                player_id: user.player_id,
            },
            data: {
                profile_picture: base64ToArrayBuffer(img),
            }

        })

        res.json({
            message: "Sikeres képfeltöltés",
            updateUser
        });
    }
}

const getImg = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(400).json({
            message: "Nem létező fiók!"
        });
    } else {
        if (user.profile_picture == null)
            return res.status(400).json({ message: "Nincs profilkép!" });
        return res.json({ message: "Profilkép sikeresen lekérve!", img: Buffer.from(user.profile_picture).toString('base64') });
    }
}

const getUserByToken = async (req, res) => {
    const user = req.user;
    return res.json({ message: "Sikeres bejelentkezés!", user: user });
}

module.exports = {
    register,
    login,
    forgotPassword,
    imgUplad,
    getImg,
    getUserByToken
}


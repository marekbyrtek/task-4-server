const User = require("../models/User");

exports.register = async (req, res) => {
    const { name, mail, password } = req.body;
    const now = new Date();
    try {
        await User.create({
            name: name,
            mail: mail,
            password: password,
            registered: now,
            lastLogged: now
        }).then(user => {
            res.status(200).json({
                message: "User created",
                user
            })
        })
    } catch(err) {
        res.status(401).json({
            message: "User not created",
            error: error.message,
        })
    }
} 
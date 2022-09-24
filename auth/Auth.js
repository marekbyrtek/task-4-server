const User = require("../models/User");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const now = new Date();
    try {
        await User.create({
            name: name,
            email: email,
            password: password,
            registered: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`,
            lastLogged: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
        }).then(user => {
            res.status(200).json({
                message: "User created",
                user
            })
        })
    } catch(err) {
        res.status(401).json({
            message: "Account already exist",
            error: console.log(err)
        })
    }
}

exports.deleteUser = async (req, res) => {
    const { _id } = req.body;
    try {
        await User.findById(_id)
        .then((user) => user.remove())
        .then((user) => {
            res.status(201).json({
                message: "User deleted",
                user
            })
        })
    } catch(err) {
        res.status(401).json({
            message: "Cannot delete user",
            error: console.log(err)
        })
    }
}

exports.blockUser = async (req, res) => {
    const { _id, status } = req.body;
    if (status === false) {
        res.status(400).json({message: "User already blocked"})
        return;
    }
    try {
        await User.findById(_id)
        .then((user) => {
            user.status = false;
            user.save((err) => {
                if (err) {
                    res.status(400).json({
                        message: "An error occurred",
                        error: console.log(err)
                    });
                    process.exit(1);
                }
                res.status(201).json({
                    message: "User blocked",
                    user
                })
            })
        })
    } catch(err) {
        res.status(400).json({
            message: "An error occurred",
            error: console.log(err)
        })
    }
}

exports.activateUser = async (req, res) => {
    const { _id, status } = req.body;
    if (status === true) {
        res.status(400).json({message: "User already active"})
        return;
    }
    try {
        await User.findById(_id)
        .then((user) => {
            user.status = true;
            user.save((err) => {
                if (err) {
                    res.status(400).json({
                        message: "An error occurred",
                        error: console.log(err)
                    });
                    process.exit(1);
                }
                res.status(201).json({
                    message: "User activated",
                    user
                })
            })
        })
    } catch(err) {
        res.status(400).json({
            message: "An error occurred",
            error: console.log(err)
        })
    }
}
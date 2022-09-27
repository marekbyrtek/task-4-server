const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
    const checkAccessToken = req.header("accessToken");
    if (checkAccessToken) {
        jwt.verify(checkAccessToken, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated");
    }
}

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const now = new Date();
    try {
        await User.create({
            name: name,
            email: email,
            password: password,
            registered: `${now.getHours()}:${now.getMinutes()} ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
            lastLogged: `${now.getHours()}:${now.getMinutes()} ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`
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

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const now = new Date();
    try {
        await User.findOne({ email, password })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "Login not successful",
                    error: "Email or password is wrong"
                });
            } else if (user.status == false) {
                res.status(401).json({
                    message: "User blocked",
                    error: "User is not active"
                })
            } {
                user.lastLogged = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
                const accessToken = jwt.sign({id: user._id, email: user.email}, "mySecretKey");
                user.save();
                res.status(200).json({
                    token: accessToken,
                    message: "Login successful",
                    user
                })
            }
        })
    } catch(err) {
        res.status(400).json({
            message: "Login not successful",
            error: console.log(err)
        })
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        await User.findById(id)
        .then((user) => {
            user.remove()
        })
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
    const { id, status } = req.body;
    if (status === false) {
        res.status(400).json({message: "User already blocked"})
        return;
    }
    try {
        await User.findById(id)
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
    const { id, status } = req.body;
    if (status === true) {
        res.status(400).json({message: "User already active"})
        return;
    }
    try {
        await User.findById(id)
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
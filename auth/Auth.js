const User = require("../models/User");

exports.register = async (req, res) => {
    const { name, mail, password } = req.body;
    const now = new Date();
    const user = new User({
        name: name,
        mail: mail,
        password: password,
        registered: now,
        lastLogged: now
    });
    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    registered: {
        type: Object,
        required: true
    },
    lastLogged: {
        type: Object,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

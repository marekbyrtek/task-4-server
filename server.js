const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const { register, deleteUser, blockUser, activateUser, login, verify } = require("./auth/Auth");
const User = require("./models/User");
const cors = require("cors");
// const router = require("./auth/Route");

app.use(cors());

const PORT = 3001;
const dbURI = "mongodb://marek:x1SBE4ExVDRkkqSE@ac-wzwslyr-shard-00-00.cy2d2qt.mongodb.net:27017,ac-wzwslyr-shard-00-01.cy2d2qt.mongodb.net:27017,ac-wzwslyr-shard-00-02.cy2d2qt.mongodb.net:27017/task-four?ssl=true&replicaSet=atlas-4yg0mt-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Connected to port ${PORT}`)))
    .catch((err) => console.log(err));

app.post("/register", register);
app.post("/delete", deleteUser);
app.put("/block", blockUser);
app.put("/activate", activateUser);
app.post("/login", login);
app.get("/auth", verify, (req, res) => {
    const user = req.user;
    res.status(200).json({
        message: "Działa",
        user
    })
});

app.get("/users", (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
})

// app.use("/api/auth", router);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const { register } = require("./auth/Auth");
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

app.get("/users", (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

// app.use("/api/auth", router);
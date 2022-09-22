const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const { register } = require("./auth/Auth");
const User = require("./models/User");
// const router = require("./auth/Route");

const PORT = 3001;
const dbURI = "mongodb+srv://marek:VZDYlNMaJNCHt3UX@tasks.meef8sd.mongodb.net/task-four?retryWrites=true&w=majority";
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
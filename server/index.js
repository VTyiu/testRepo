const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const MatchModel = require("./models/Matches");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user1:valstats@cluster0.vn2kb.mongodb.net/valstats?retryWrites=true&w=majority");

// req: request - get info from front end, res: response - send info from front end to back end
app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err); // send error back to front end
        } else {
            res.json(result); // will send back result that we got from the table
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body; // user represents data we wanna send to database
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user); // won't be using this data but will send it back so we know that we got back the correct info in backend
});

app.get("/getMatches", (req, res) => {
    MatchModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createMatch", async (req, res) => {
    const match = req.body;
    const newMatch = new MatchModel(match);
    await newMatch.save();
    res.json(match);
});

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
});
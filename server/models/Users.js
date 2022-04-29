const mongoose = require("mongoose");

// use both embedded documents and subset pattern
// most recent 5 entries will be stored in match in user schema but all other matches will be in
// match collection where all matches are stored and each match will contain a reference to the user that entered it

// create match schema
// const matchSchema = mongoose.Schema({
//     map: {
//         type: String,
//         required: true,
//     },
//     agent: {
//         type: String,
//         required: true,
//     },
// });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    //match: [matchSchema],
    matches: [
        {
            match_id: {
                type: Number,
                required: true
            },
            map: {
                type: String,
                required: true
            },
            agent: {
                type: String,
                required: true
            },
            gun: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("users", UserSchema);

// const UserModel = mongoose.model("users", UserSchema);
// module.exports = UserModel;

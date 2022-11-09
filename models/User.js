const mongoose = require("mongoose")
const collection = "users"

const Piece = require("./Piece")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pieces: [Piece.schema],
    public: {
        type: Boolean,
        required: true,
        default: true,
    },
    friends: {
        active: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        incomingRequests: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        outgoingRequests: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
})

const User = mongoose.model("User", UserSchema, collection)

module.exports = User

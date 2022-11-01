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
});

const User = mongoose.model("User", UserSchema, collection)

module.exports = User

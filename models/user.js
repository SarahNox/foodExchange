const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  address: {
    street: String,
    number: String,
    city: String,
    postal_code: String,
  },
    location: { type: { type: String }, coordinates: [Number] }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

userSchema.index({ location: "2dsphere" })
const User = mongoose.model("User", userSchema);
module.exports = User;

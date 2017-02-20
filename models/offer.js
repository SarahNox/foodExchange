const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const offerSchema = new Schema({
  offer: Array
  // owner: UserSchema
});

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;

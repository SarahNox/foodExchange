const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const offerSchema = new Schema({
  offer: [],
  owner: Schema.Types.ObjectId
  // userSchema
});

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;

// location: { type: { type: String }, coordinates: [Number] }

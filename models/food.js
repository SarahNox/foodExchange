const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const foodSchema = new Schema({
  owner: Schema.Types.ObjectId,
  isOffer: Boolean,
  foodName: String,
  address: {
    street: String,
    number: String,
    city: String,
    postal_code: String,
  },
    location: { type: { type: String }, coordinates: [Number] }
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;

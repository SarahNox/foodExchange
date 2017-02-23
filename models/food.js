const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const foodSchema = new Schema({
  owner: Schema.Types.ObjectId,
  request: Schema.Types.ObjectId,
  foodName: String,
  quantity: Number,
  address: {
    street: String,
    number: String,
    city: String,
    postal_code: String,
  },
    location: { type: { type: String }, coordinates: [Number] }
  // userSchema
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const searchSchema = new Schema({
  name: String,
  description: String,
  location: { type: { type: String }, coordinates: [Number] }
});
searchSchema.index({ location: '2dsphere' });


const Search = mongoose.model("Search", searchSchema);
module.exports = Search;

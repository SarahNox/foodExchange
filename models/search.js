const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const searchSchema = new Schema({
  search: [],
  owner: Schema.Types.ObjectId
  // userSchema
});

const Search = mongoose.model("Search", searchSchema);
module.exports = Search;

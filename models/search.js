const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const searchSchema = new Schema({
  search: Array
  // owner: UserSchema
});

const Search = mongoose.model("Search", searchSchema);
module.exports = Search;

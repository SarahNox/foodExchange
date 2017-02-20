const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const offerSchema = new Schema({
  name: String,
  description: {
		String,
	  enum : ['Offer', 'Search']
	},
	location: { type: { type: String }, coordinates: [Number] }
});

PlaceSchema.index({ location: '2dsphere' });

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;

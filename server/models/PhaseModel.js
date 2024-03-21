const mongoose = require("mongoose");

const subPhaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },  
  subphases: [this],  
});

const phaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  subphases: [subPhaseSchema], 
});

module.exports = mongoose.model("Phase", phaseSchema);
 
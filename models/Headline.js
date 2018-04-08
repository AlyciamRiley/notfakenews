var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }, 
  saved: {
    type: Boolean, 
    required: false,
    default: false
  }
});

var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;

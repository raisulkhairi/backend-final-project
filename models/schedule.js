const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  allDay: {
    type: Boolean,
    required: true,
  },
});
scheduleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
scheduleSchema.set("toJSON", {
  virtuals: true,
});

const scheduleModel = mongoose.model("Schedule", scheduleSchema);
module.exports = scheduleModel;

var mongoose = require("mongoose");

var DoctorSchema = new mongoose.Schema({
   name: String,
   special:String,
   description: String,
clinicno:Number,
   patient: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Doctor", DoctorSchema);
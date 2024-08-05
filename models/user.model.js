const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  isAgent: { type: Boolean, default: false },
  skills: { type: Array, default: false },
  profile: {
    type: String,
    require: true,
    default:
      "https://d326fntlu7tb1e.cloudfront.net/uploads/4821d814-ac87-4b22-aa80-ac7336916c9a-403017_avatar_default_head_person_unknown_icon.png",
  },
});
module.exports = mongoose.model("User", UserSchema);

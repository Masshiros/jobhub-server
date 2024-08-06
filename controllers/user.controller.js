const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
module.exports = {
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_SALT
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const { password, __v, createdAt, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (e) {
      res.status(500);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Success");
    } catch (e) {
      res.status(500).json(e);
    }
  },
};

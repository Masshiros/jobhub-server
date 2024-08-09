const User = require("../models/user.model");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      ...req.body,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_SALT
      ),
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      !user && req.status(401).json("Invalid Credentials");
      const decryptedPass = CryptoJs.AES.decrypt(
        user.password,
        process.env.SECRET_SALT
      );
      console.log(user.password);
      const depassword = decryptedPass.toString(CryptoJs.enc.Utf8);

      depassword !== req.body.password &&
        res.status(401).json("Invalid Credentials");
      const userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isAgent: user.isAgent,
        },
        process.env.JWT_SECRET,
        { expiresIn: "21d" }
      );

      const { password, __v, createdAt, ...others } = user._doc;

      res.status(200).json({ ...others, userToken });
    } catch (e) {
      res.status(500);
    }
  },
  updateUser: async (req, res) => {},
};

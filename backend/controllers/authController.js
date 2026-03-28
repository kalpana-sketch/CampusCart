const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, profileImage, year, major } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImage || "",
      year: year || "",
      major: major || ""
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, year, major, profileImage } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (year) user.year = year;
    if (major) user.major = major;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      year: user.year,
      major: user.major
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        year: user.year,
        major: user.major
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
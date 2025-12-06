// Authentication controller
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendOtpEmail = require("../config/email");
const generateOtp = require("../utils/generateOtp");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    if (!user) {
      user = new User({
        name,
        email,
        password: hashedPassword,
        otpCode: otp,
        otpExpiresAt: Date.now() + 10 * 60 * 1000,
      });
    } else {
      user.name = name;
      user.password = hashedPassword;
      user.otpCode = otp;
      user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    }

    await user.save();
    await sendOtpEmail(email, name, otp);

    return res.json({ message: "OTP sent to email. Please verify." });

  } catch (err) {
   console.error("Signup Error:", err);
return res.status(500).json({ message: "Server error", error: err.message });

  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Already verified" });

    if (user.otpCode !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      message: "Email verified",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(400).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

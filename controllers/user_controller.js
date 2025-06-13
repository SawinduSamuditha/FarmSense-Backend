const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Respond with user info (excluding password)
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getIsEnteredById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('isEntered');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ isEntered: user.isEntered });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Add user details to an existing user (by ID)
exports.addUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullName, phoneNumber, yourPlants, address, profileAvatar } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (fullName !== undefined) user.fullName = fullName;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (yourPlants !== undefined) user.yourPlants = yourPlants;
        if (address !== undefined) user.address = address;
        if (profileAvatar !== undefined) user.profileAvatar = profileAvatar;

        // Always set isEntered to true
        user.isEntered = true;

        await user.save();

        res.status(200).json({ message: 'User details added successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update user details (by ID)
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullName, phoneNumber, yourPlants, address, profileAvatar } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (fullName !== undefined) user.fullName = fullName;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (yourPlants !== undefined) user.yourPlants = yourPlants;
        if (address !== undefined) user.address = address;
        if (profileAvatar !== undefined) user.profileAvatar = profileAvatar;

        // Always set isEntered to true
        user.isEntered = true;

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

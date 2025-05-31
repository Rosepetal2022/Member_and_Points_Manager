// controllers/authController.js
const bcrypt = require('bcryptjs');
const { signToken } = require('../auth');

// Dummy user store (replace with DB later)
const users = [];

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    _id: Date.now().toString(),
    email,
    password: hashedPassword
  };

  users.push(newUser);

  const token = signToken(newUser);
  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user);
  res.json({ token });
};

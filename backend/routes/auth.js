import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.status(201).json({ token ,msg :"User created successfully"});
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.status(200).json({ token , msg:"LogIn successfully"});
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;

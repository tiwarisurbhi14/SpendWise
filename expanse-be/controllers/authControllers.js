const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h'     
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await User.create({ name, email, password });

    const token = createToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,                
      sameSite: 'None',              
      maxAge: 60 * 60 * 1000          
    });
    

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = createToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 60 * 60 * 1000
    });
    
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(401).json({ error: 'Not authenticated' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
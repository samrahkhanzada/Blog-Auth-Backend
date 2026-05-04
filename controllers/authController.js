// import user from "../models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";


import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const genToken = (res, userId) => {
 const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
 res.cookie('token', token, {
 httpOnly: true,
 secure: process.env.NODE_ENV === 'production',
 sameSite: 'None',
 maxAge: 7 * 24 * 60 * 60 * 1000
 });
};
export const register = async (req, res) => {
 try {
 const { name, email, password } = req.body;
 const exists = await User.findOne({ email });
 if (exists) return res.status(400).json({ msg: 'User already exists' });
 const user = await User.create({ name, email, password });
 genToken(res, user._id);
 res.status(201).json({ _id: user._id, name: user.name, email: user.email });
 } catch (err) { res.status(500).json({ msg: err.message }); }
};
export const login = async (req, res) => {
 try {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (!user || !(await bcrypt.compare(password, user.password)))
 return res.status(401).json({ msg: 'Invalid credentials' });
 genToken(res, user._id);
 res.json({ _id: user._id, name: user.name, email: user.email });
 } catch (err) { res.status(500).json({ msg: err.message }); }
};
export const logout = (req, res) => {
 res.clearCookie('token');
 res.json({ msg: 'Logged out' });
};

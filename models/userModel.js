const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'moderator'], default: 'user' },
  fullname: { type: String },
  avatar: { type: String, default: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_face,r_20,d_avatar.png/non_existing_id.png' },
  gender: { type: String, default: 'Not Assigned' },
  phone_number: { type: String },
  address: { type: String },
  description: { type: String },
  website: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

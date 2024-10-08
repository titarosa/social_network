const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Please enter a valid email address.',
    },
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true, 
});

// Virtual property for friend count
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Method to add a friend
UserSchema.methods.addFriend = async function(friendId) {
  if (!this.friends.includes(friendId)) {
    this.friends.push(friendId);
    await this.save(); 
  }
  return this; 
};

// Method to remove a friend
UserSchema.methods.removeFriend = async function(friendId) {
  this.friends = this.friends.filter(friend => friend.toString() !== friendId);
  await this.save(); 
  return this; 
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

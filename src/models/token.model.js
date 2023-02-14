const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30 * 86400, // 30 days,
    },
    expireAt: {
      type: Date,
      expires: 30 * 86400, // 30 days,
    },
  },

  { collections: 'refreshToken' }
);

const Token = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = Token;

// middleware/auth.js
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

function signToken({ member_id, email_address }) {
  const payload = { member_id, email_address };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = { signToken };
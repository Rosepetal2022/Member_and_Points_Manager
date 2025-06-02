const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // your PostgreSQL pool connection

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    email_address,
    hash_password,
    street_address,
    city,
    us_state,
    zip_code,
    phone_number,
    member_status
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM members WHERE email_address = $1',
      [email_address]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(hash_password, 10);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO members (
        first_name, last_name, date_of_birth, email_address, hash_password,
        street_address, city, us_state, zip_code, phone_number, member_status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING member_id`,
      [
        first_name,
        last_name,
        date_of_birth,
        email_address,
        hashedPassword,
        street_address,
        city,
        us_state,
        zip_code,
        phone_number,
        member_status
      ]
    );

    const token = jwt.sign(
      { member_id: result.rows[0].member_id, email_address },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Registration successful', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


exports.login = async (req, res) => {
  const { email_address, password } = req.body;

  try {
    const userResult = await pool.query(
      'SELECT * FROM members WHERE email_address = $1',
      [email_address]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.hash_password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { member_id: user.member_id, email_address: user.email_address },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.env.SEED_EMAIL || 'demo@example.com';
  const password = process.env.SEED_PASSWORD || 'password123';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('User already exists');
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });
    console.log('Created user', email);
  }
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

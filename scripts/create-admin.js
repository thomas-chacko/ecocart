// Run this script to create an admin user
// Usage: node scripts/create-admin.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    name: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'ecocartadmin@gmail.com';
    const password = 'ecocartAdmin123!';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with email:', existingAdmin.email);
      console.log('📧 Stored email:', existingAdmin.email);
      console.log('🔑 Stored password:', existingAdmin.password);
      console.log('👤 Name:', existingAdmin.name);
      
      // Update password if different
      if (existingAdmin.password !== password) {
        existingAdmin.password = password;
        await existingAdmin.save();
        console.log('✅ Password updated successfully');
      } else {
        console.log('✅ Password matches');
      }
    } else {
      // Create new admin
      const admin = await Admin.create({
        email,
        password,
        name: 'EcoCart Admin',
      });
      console.log('✅ Admin created successfully');
      console.log('📧 Email:', admin.email);
      console.log('🔑 Password:', admin.password);
      console.log('👤 Name:', admin.name);
    }

    await mongoose.connection.close();
    console.log('✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();

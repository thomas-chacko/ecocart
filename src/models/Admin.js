import mongoose from 'mongoose';

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
    collection: 'admin', // Explicitly set collection name to 'admin' (singular)
  }
);

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  nationalCode: { type: String, default: '' },
  birthYear: { type: String, default: '' },
  gender: { type: String, default: '' },
  city: { type: String, default: '' },
  email: { type: String, default: '' },
  avatar: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
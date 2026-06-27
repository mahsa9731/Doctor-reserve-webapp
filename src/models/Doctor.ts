import mongoose, { Schema, model, models } from 'mongoose';

// تعریف ساختار زمان‌های خالی پزشک
const AvailableSlotSchema = new Schema({
  date: { type: String, required: true }, // به صورت رشته مثل: "دوشنبه ۲۴ دی" یا "۱۴۰۵/۱۰/۲۴"
  times: [{ type: String }] // آرایه‌ای از ساعت‌ها مثل: ["۱۴:۳۰", "۱۵:۱۵", "۱۶:۰۰"]
}, { _id: false });

const DoctorSchema = new Schema({
  name: { type: String, required: true },          
  specialty: { type: String, required: true },    
  medicalCode: { type: String, required: true, unique: true }, 
  rating: { type: Number, default: 5 },            
  reviewsCount: { type: Number, default: 0 },     
  address: { type: String, required: true },      
  avatar: { type: String, default: '/images/default-doctor.png' }, 
  slug: { type: String, required: true, unique: true }, 
  description: { type: String, default: '' }, 
  availableSlots: [AvailableSlotSchema],      
  
  contactInfo: {
    officePhone: { type: String, default: '' }, 
    instagram: { type: String, default: '' },  
    website: { type: String, default: '' }      
  },
  
  createdAt: { type: Date, default: Date.now }
});

const Doctor = models.Doctor || model('Doctor', DoctorSchema);

export default Doctor;
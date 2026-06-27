import mongoose, { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
 
  userPhone: { type: String, required: true }, 
  patientName: { type: String, required: true }, 

  
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  doctorName: { type: String, required: true },        
  doctorSpecialty: { type: String, required: true },   
  doctorMedicalCode: { type: String, required: true }, 
  doctorAvatar: { type: String },                      
  doctorRating: { type: Number, default: 5 },          
  doctorReviewsCount: { type: Number, default: 0 },   
  doctorAddress: { type: String, required: true },     


  date: { type: String, required: true },             
  time: { type: String, required: true },             

 
  trackingCode: { type: String, required: true, unique: true },

 
  status: { type: String, enum: ['scheduled', 'canceled', 'completed'], default: 'scheduled' },
  
  createdAt: { type: Date, default: Date.now }
});

const Appointment = models.Appointment || model('Appointment', AppointmentSchema);

export default Appointment;
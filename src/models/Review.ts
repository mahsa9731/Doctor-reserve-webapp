import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  doctorId: mongoose.Types.ObjectId;
  rating: number;
  recommendation: 'yes' | 'no' | null;
  comment: string;
  createdAt: Date;
  isApproved: boolean; 
}


const ReviewSchema: Schema<IReview> = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor', 
      required: [true, 'آیدی پزشک الزامی است'],
    },
    rating: {
      type: Number,
      required: [true, 'ثبت امتیاز الزامی است'],
      min: 1,
      max: 5,
    },
    recommendation: {
      type: String,
      enum: ['yes', 'no', null],
      default: null,
    },
    comment: {
      type: String,
      required: [true, 'متن نظر نمی‌تواند خالی باشد'],
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin should check reviews and let them go on webapp.
    },
  },
  {
    timestamps: true, 
  }
);


const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
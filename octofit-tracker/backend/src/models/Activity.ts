import { Schema, model, Types } from 'mongoose';

interface IActivity {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  activityType: 'running' | 'cycling' | 'swimming' | 'weightlifting' | 'walking';
  duration: number;
  distance?: number;
  calories: number;
  pointsEarned: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    activityType: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'weightlifting', 'walking'],
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    distance: {
      type: Number
    },
    calories: {
      type: Number,
      required: true
    },
    pointsEarned: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
export type { IActivity };

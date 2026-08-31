import { Schema, model, Types } from 'mongoose';

interface IWorkout {
  _id: Types.ObjectId;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
  }>;
  recommendedFor: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number
      }
    ],
    recommendedFor: [String]
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
export type { IWorkout };

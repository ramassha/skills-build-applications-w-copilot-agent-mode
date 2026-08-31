import { Schema, model } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  displayName: string;
  bio?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    passwordHash: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      default: ''
    },
    points: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
export type { IUser };

import { Schema, model, Types } from 'mongoose';

interface ILeaderboard {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  username: string;
  totalPoints: number;
  rank: number;
  totalActivities: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: 0
    },
    totalActivities: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
export type { ILeaderboard };

import { Schema, model, Types } from 'mongoose';

interface ITeam {
  _id: Types.ObjectId;
  name: string;
  description: string;
  leader: Types.ObjectId;
  members: Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    totalPoints: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
export type { ITeam };

import { Schema, model } from 'mongoose';
import { User } from './User';

export interface Goal {
  completed: boolean;
  goal: string;
  date: Date;
  user: typeof User;
};

const goalsSchema = new Schema<Goal>({
  goal:
    {
      completed: {
        type: Boolean,
        default: false,
      },
      goal: String,
    },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

export const TodaysGoals = model<Goal>('TodaysGoals', goalsSchema);
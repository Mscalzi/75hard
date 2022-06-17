import { Schema, model } from 'mongoose';

export interface Goal {
  completed: boolean;
  goal: string;
  date: Date;
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
});

export const TodaysGoals = model<Goal>('TodaysGoals', goalsSchema);
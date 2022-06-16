import { Schema, model } from 'mongoose';

export interface Goal {
  completed: boolean;
  goal: string;
  date: Date;
};

const goalsSchema = new Schema<Goal>({
  goal:
    {
      completed: Boolean,
      goal: String,
    },
  date: Date,
});

export const TodaysGoals = model<Goal>('TodaysGoals', goalsSchema);
// module.exports = TodaysGoals;
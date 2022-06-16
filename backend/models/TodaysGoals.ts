import { Schema, model, Document } from 'mongoose';

export interface Goal extends Document {
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
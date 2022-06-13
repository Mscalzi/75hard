import { Schema, model } from 'mongoose';

interface Goal {
  completed: boolean;
  goal: string;
};

interface Goals {
  goal: Goal[];
};

const goalsSchema = new Schema<Goals>({
  goal: [
    {
      completed: Boolean,
      goal: String,
    },
  ],
});

const TodaysGoals = model<Goals>('TodaysGoals', goalsSchema);
module.exports = TodaysGoals;
const { getOne, updateOne, createOne, deleteOne, getAll } = require('./handlerFactory.ts');
const { TodaysGoals } = require('../models/TodaysGoals.ts');
module.exports.getOneGoal = getOne(TodaysGoals);
module.exports.updateGoal = updateOne(TodaysGoals);
module.exports.createGoal = createOne(TodaysGoals);
module.exports.deleteGoal = deleteOne(TodaysGoals);
module.exports.getAllGoals = getAll(TodaysGoals);
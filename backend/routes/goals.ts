const { getAllGoals, getOneGoal, updateGoal, createGoal, deleteGoal } = require('../controllers/goalController.ts');
const {  Router } = require('express');

const router = Router();

router.get('/', getAllGoals);
router.get('/:id', getOneGoal);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
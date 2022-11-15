import express from 'express'
const router = express.Router()

import isAuth from '../middleware/isAuth.js'

import {
    expensesGetController,
    expensesCreateController,
    updateExpensesController,
    expensesDeleteController,
    expensesGetByIdController,
} from '../controllers/expensesController.js'

router
    .get('/expenses', expensesGetController)
    .get('/expenses/:id', expensesGetByIdController)
    .post('/expenses', expensesCreateController)
    .put('/expenses', updateExpensesController)
    .delete('/expenses/:id', expensesDeleteController)

export default router

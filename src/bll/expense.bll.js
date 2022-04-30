const errorLogBLL = require('./error-log.bll');
const Expense = require('../model/expense.model');


class expenseBLL {
    async addExpense(expenseObj) {
        try {
            const expense = new Expense({
                expenseDate : expenseObj.expenseDate,
                amount : expenseObj.amount,
                currency : expenseObj.currency,
                category_id : expenseObj.category_id,
                description : expenseObj.description,
                createdBy : expenseObj.createdBy,
                createdAt : new Date(),
            });

            const result = await Expense.insert(expense);
            return result;
        } catch (error) {
            await new errorLogBLL().logError('expenseBLL', 'addExpense', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = expenseBLL;
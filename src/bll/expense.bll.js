const errorLogBLL = require('./error-log.bll');
const Expense = require('../model/expense.model');
const userBLL = require('./user.bll');
const User = require('../model/user.model');

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

    async getExpense(expenseObj){
        try {
            const user = await User.findByUsername(expenseObj.username);
            const result = await Expense.findByCreater(user.userId);
            return {
                status : true,
                result : result
            };
        } catch (error) {
            await new errorLogBLL().logError('expenseBLL', 'getExpense', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = expenseBLL;
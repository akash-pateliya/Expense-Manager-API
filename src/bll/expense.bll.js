const errorLogBLL = require('./error-log.bll');
const Expense = require('../model/expense.model');
const User = require('../model/user.model');

class expenseBLL {
    async addExpense(expenseObj) {
        try {
            const user = await User.findByUsername(expenseObj.username);
            const expense = new Expense({
                expenseDate : new Date(expenseObj.expenseDate),
                amount : expenseObj.amount,
                currency : expenseObj.currency,
                category_id : expenseObj.category_id,
                description : expenseObj.description,
                createdBy : user.userId,
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

    async getExpense(username){
        try {
            const user = await User.findByUsername(username);
            const result = await Expense.findByCreater(user.userId);
            result.forEach(ele => {
                ele.expenseDate =  ele.expenseDate.getDate() + '/' + ele.expenseDate.getMonth() + '/' + ele.expenseDate.getFullYear();
            })
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
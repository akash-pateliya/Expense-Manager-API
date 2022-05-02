const errorLogBLL = require('./error-log.bll');
const expenseBLL = require('./expense.bll');

class dashboardBLL {
    async getDashboard(username) {
        try {
            const totalAmount = await this.getTotalAmount(username);
            const lastFiveExpenseArr = await this.getLastFiveExpense(username);

            const result = {
                status: true,
                totalAmount: totalAmount,
                lastFiveExpenses: lastFiveExpenseArr
            }

            return result;
        } catch (error) {
            await new errorLogBLL().logError('dashboardBLL', 'getDashboard', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getTotalAmount(username) {
        try {
            const expenses = await new expenseBLL().getExpense(username);
            let sum = 0;
            expenses.result.forEach(ele => {
                sum = sum + Number(ele.amount);
            });
            return sum;
        } catch (error) {
            await new errorLogBLL().logError('dashboardBLL', 'getTotalAmount', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getLastFiveExpense(username) {
        try {
            const expenses = await new expenseBLL().getExpense(username);
            return expenses.result.slice(0, 5);
        } catch (error) {
            await new errorLogBLL().logError('dashboardBLL', 'getLastFiveExpense', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = dashboardBLL;
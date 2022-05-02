const Expense = require('../model/expense.model');
const User = require('../model/user.model');
const errorLogBLL = require('./error-log.bll');

class reportBLL {
    async getReports(username) {
        try {
            const user = await User.findByUsername(username);
            const totalAmountSpentPerWeek = await Expense.findAmountSpentPerWeek(user.userId);
            const totalAmountSpentPerCategory = await this.getTotalAmountSpentPerCategory(user.userId);

            const result = {
                status: true,
                totalAmountSpentPerWeek: totalAmountSpentPerWeek ? totalAmountSpentPerWeek : null,
                totalAmountSpentPerCategory: totalAmountSpentPerCategory ? totalAmountSpentPerCategory : null
            }

            return result;
        } catch (error) {
            await new errorLogBLL().logError('reportBLL', 'getReports', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getTotalAmountSpentPerWeek(username) {
        try {

        } catch (error) {
            await new errorLogBLL().logError('reportBLL', 'getTotalAmountSpentPerWeek', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getTotalAmountSpentPerCategory(username) {
        try {

        } catch (error) {
            await new errorLogBLL().logError('reportBLL', 'getTotalAmountSpentPerCategory', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = reportBLL;
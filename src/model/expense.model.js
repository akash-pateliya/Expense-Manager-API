const sql = require("./db.js");
const errorLogBLL = require('../bll/error-log.bll');

const Expense = function (expenseObj) {
    this.expenseDate = expenseObj.expenseDate;
    this.amount = expenseObj.amount;
    this.currency = expenseObj.currency;
    this.category_id = expenseObj.category_id;
    this.description = expenseObj.description;
    this.createdBy = expenseObj.createdBy;
    this.createdAt = expenseObj.createdAt;
};

Expense.insert = async (expenseObj) => {
    try {
        const res = await sql.query("INSERT INTO expenses SET ?", expenseObj);
        return { status: true, result: { Id: res.insertId, ...expenseObj } };
    } catch (error) {
        await new errorLogBLL().logError('expense.model', 'Expense.insert', error);
        return {
            status: false,
            error: error.message
        }
    }
};

Expense.findByCreater = async (createdBy) => {
    try {
        const res = await sql.query("select * from expenses where createdBy = ? and isDeleted is null", [createdBy]);
        if (res[0].length > 0) {
            return res[0];
        }
        return null;
    } catch (error) {
        await new errorLogBLL().logError('expense.model', 'Expense.findByCreater', error);
        return {
            status: false,
            error: error.message
        }
    }
}

module.exports = Expense;

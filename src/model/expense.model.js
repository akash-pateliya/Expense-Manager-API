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
        const res = await sql.query("select expenseDate,amount,currency,description,category_name from expenses join lib_categories on lib_categories.id = expenses.category_id where expenses.createdBy = ? and expenses.isDeleted is null order by expenses.createdAt desc", [createdBy]);
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

Expense.findAmountSpentPerWeek = async (createdBy) => {
    const sqlQuery = `SELECT FLOOR((DAYOFMONTH(CURRENT_DATE()) - 1) / 7) + 1 AS week_of_month, sum(amount) 
    FROM EXPENSES
    WHERE month(expenseDate) = month(curdate()) and createdBy = ${createdBy}
    GROUP BY week_of_month`;

    const res = await sql.query(sqlQuery);
    if (res[0].length > 0) {
        return res[0];
    }
    return null;
}

Expense.findAmountSpentPerCategory = async (createdBy) => {
    const sqlQuery = `SELECT category_name, sum(amount)
    FROM expenses exp
    INNER JOIN lib_categories lc on lc.id = exp.id
    WHERE month(expenseDate) = month(curdate()) and exp.createdBy = ${createdBy}
    GROUP BY category_name`

    const res = await sql.query(sqlQuery);
    if(res[0].length > 0){
        return res[0];
    }
    return null;
}

module.exports = Expense;

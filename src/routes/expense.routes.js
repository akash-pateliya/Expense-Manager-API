module.exports = (app) => {
    const expense = require('../controller/expense.controller');

    app.post('/add-expense', expense.insert);
    app.get('/get-expense', expense.get);
}
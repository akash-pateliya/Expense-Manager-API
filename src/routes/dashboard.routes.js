module.exports = (app) => {
    const dashboard = require('../controller/dashboard.controller');

    app.get('/get-expense', dashboard.get);
}
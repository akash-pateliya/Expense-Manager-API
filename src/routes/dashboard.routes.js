module.exports = (app) => {
    const dashboard = require('../controller/dashboard.controller');

    app.get('/get-dashboard', dashboard.get);
}
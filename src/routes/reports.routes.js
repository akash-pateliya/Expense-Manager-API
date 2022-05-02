module.exports = (app) => {
    const reports = require('../controller/reports.controller');

    app.get('/get-reports', reports.get);
}
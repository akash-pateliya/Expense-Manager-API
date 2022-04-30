module.exports = (app) => {
    const user = require('../controller/user.controller');

    app.post('/register', user.register);
    app.post('/login', user.login);
}
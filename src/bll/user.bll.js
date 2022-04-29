const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const errorLogBLL = require('./error-log.bll');

class userBLL {
    async registerUser(userObj) {
        try {
            let existingUser = await User.findByUsername(userObj.userName);
            if (existingUser) {
                return { status: false, message: 'username already exists !!' };
            }

            existingUser = await User.findByEmail(userObj.userName);
            if (existingUser) {
                return { status: false, message: 'email already registered !!' };
            }
            const encryptedPassword = await this.encryptPassword(userObj.password);
            const user = new User({
                fullName: userObj.fullName,
                userName: userObj.userName,
                email: userObj.email,
                password: encryptedPassword,
                createdOn: new Date()
            });

            const result = await User.register(user);
            return result;
        } catch (error) {
            await new errorLogBLL().logError('userBLL', 'registerUser', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async encryptPassword(password) {
        try {
            const encrypt = await bcrypt.hash(password, 10);
            return encrypt;
        } catch (error) {
            await new errorLogBLL().logError('userBLL', 'encryptPassword', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = userBLL;
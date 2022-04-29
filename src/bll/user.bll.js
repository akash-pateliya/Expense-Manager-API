const User = require('../model/user.model');
const bcrypt = require('bcrypt');

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
            });

            const result = await User.register(user);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async encryptPassword(password) {
        const encrypt = await bcrypt.hash(password, 10);
        return encrypt;
    }
}

module.exports = userBLL;
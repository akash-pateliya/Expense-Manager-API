const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const errorLogBLL = require('./error-log.bll');
const jwt = require('jsonwebtoken');
require('dotenv').config()

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

    async loginUser(username, password){
        try {
            const existingUser = await User.findByUsername(username);
            if(existingUser){
                const isPasswordValid = await bcrypt.compare(password, existingUser.password);
                return {
                    status : isPasswordValid,
                    message : isPasswordValid ? 'Login Successfull !!' : 'Invalid Password !!',
                    username : username,
                    token : isPasswordValid ? await this.generateToken(username) : null
                }
            }
            return {status : false, message : 'Invalid username !!'};
        } catch (error) {
            await new errorLogBLL().logError('userBLL', 'encryptPassword', error);
            return {
                status: false,
                message: error.message
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

    async generateToken(username){
        try {
            const token = await jwt.sign({username : username}, process.env.SECRET_KEY);
            return token;
        } catch (error) {
            await new errorLogBLL().logError('userBLL', 'generateToken', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async verifyToken(token){
        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            return {
                status : decode?.username,
                username : decode?.username
            }
        } catch (error) {
            await new errorLogBLL().logError('userBLL', 'verifyToken', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async validateUser(token, username){
        const result = await this.verifyToken(token);
        if(result.status){
            return username == result.username;
        }
        return false;
    }
}

module.exports = userBLL;
const errorLogBLL = require("../bll/error-log.bll.js");
const sql = require("./db.js");

// constructor
const User = function (user) {
  this.fullName = user.fullName;
  this.userName = user.userName;
  this.email = user.email
  this.password = user.password
};

User.register = async (newUser) => {
  try {
    const res = await sql.query("INSERT INTO users SET ?", newUser);
    return { status: true, result: { userId: res.insertId, ...newUser } };

  } catch (error) {
    await new errorLogBLL().logError('user.model', 'User.register', error);
    return {
      status: false,
      error: error.message
    }
  }
};

User.findByUsername = async (username) => {
  try {
    const res = await sql.query(`SELECT * FROM users WHERE username = '${username}'`)
    if (res.length) {
      return res[0];
    }
    return null;
  } catch (error) {
    await new errorLogBLL().logError('user.model', 'User.findByUsername', error);
    return {
      status: false,
      error: error.message
    }
  }
}

User.findByEmail = async (email) => {
  try {
    const res = await sql.query(`SELECT * FROM users WHERE email = '${email}'`)
    if (res.length) {
      return res[0];
    }
    return null;
  } catch (error) {
    await new errorLogBLL().logError('user.model', 'User.findByEmail', error);
    return {
      status: false,
      error: error.message
    }
  }
}
module.exports = User;

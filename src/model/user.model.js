const sql = require("./db.js");

// constructor
const User = function(user) {
  this.fullName = user.fullName;
  this.userName = user.userName;
  this.email = user.email
  this.password = user.password
};

User.register = async (newUser) => {
  const res = await sql.query("INSERT INTO users SET ?", newUser);
  return { status : true, result : {userId: res.insertId, ...newUser}};
};

User.findByUsername = async (username) => {
   try {
    const res = await sql.query(`SELECT * FROM users WHERE username = '${username}'`)
    if (res.length) {
      return res[0];     
    }
    return null;
   } catch (error) {
     console.log(error);
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
    
  }
}
module.exports = User;

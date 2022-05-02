const sql = require("./db.js");

const ErrorLog = function (errorLog) {
  this.className = errorLog.className;
  this.methodName = errorLog.methodName;
  this.error = errorLog.error;
};

ErrorLog.logError = async (errorLog) => {
  await sql.query("INSERT INTO error_log SET ?", errorLog);
};

module.exports = ErrorLog;

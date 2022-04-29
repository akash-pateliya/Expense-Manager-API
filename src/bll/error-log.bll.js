const ErrorLog = require('../model/error-log.model');
const { v4: uuid } = require('uuid');

class errorLogBLL {

    async logError(className, methodName, error) {
        try {
            const errorLog = new ErrorLog({
                className : className,
                methodName : methodName,
                error : error,
            });

            await ErrorLog.logError(errorLog);
        } catch (error) {
            throw new Error(`Method : logError, Class : errorLogBLL, Error : ${error.message}`);
        }
    }
}

module.exports = errorLogBLL;
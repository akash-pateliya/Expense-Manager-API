const { StatusCodes } = require("http-status-codes");
const expenseBLL = require("../bll/expense.bll");
const userBLL = require("../bll/user.bll");

exports.insert = async (req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: "Content can not be empty!"
            });
        }
        const isValid = await new userBLL().validateUser(req.body.token, req.body.username);
        if (isValid) {
            const result = await new expenseBLL().addExpense(req.body);
            return res.status(StatusCodes.OK).send(result);
        }
        return res.status(StatusCodes.UNAUTHORIZED).send({ status: false, message: 'Not Authorised !!' })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

exports.get = async (req, res) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: "Content can not be empty!"
            });
        }
        const isValid = await new userBLL().validateUser(req.body.token, req.body.username);
        if (isValid) {
            const result = await new expenseBLL().getExpense(req.body);
            return res.status(StatusCodes.OK).send(result);
        }
        return res.status(StatusCodes.UNAUTHORIZED).send({ status: false, message: 'Not Authorised !!' })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}
const { StatusCodes } = require("http-status-codes");
const dashboardBLL = require("../bll/dashboard.bll");
const userBLL = require("../bll/user.bll");

exports.get = async (req, res) => {
    try {
        if (!Object.keys(req.query).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: "Content can not be empty!"
            });
        }
        const isValid = await new userBLL().validateUser(req.query.token, req.query.username);
        if (isValid) {
            const result = await new dashboardBLL().getDashboard(req.query.username);
            return res.status(StatusCodes.OK).send(result);
        }
        return res.status(StatusCodes.UNAUTHORIZED).send({ status: false, message: 'Not Authorised !!' })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}
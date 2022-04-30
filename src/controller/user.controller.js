const { StatusCodes } = require("http-status-codes");
const userBLL = require("../bll/user.bll");

exports.register = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Content can not be empty!"
      });
    }
    const result = await new userBLL().registerUser(req.body);
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    if (!Object.keys(req.body).length || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Please provide username or passoword !!"
      });
    }
    const result = await new userBLL().loginUser(req.body.username, req.body.password);
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}
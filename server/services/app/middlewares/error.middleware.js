"use strict";

module.exports = (err, req, res, next) => {
  // console.log(err, '<<<<<<');
  // console.log(err.name, '>>>>>');
  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "NotFound":
      status = 404;
      message = "Data Not Found";
      break;

    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;

    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;

    case "TokenExpiredError":
      status = 400;
      message = "Access Token is Expired";
      break;

    case "NotFoundLoginDetais":
      status = 401;
      message = "Invalid Email";
      break;

    case "Invalid Password":
      status = 401;
      message = "Invalid Password";
      break;

    case "NoToken":
      status = 401;
      message = "Access Token is Required";
      break;

    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;

    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(status).json({ message: message });
};

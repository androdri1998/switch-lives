const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized",
      error_description: "Token not provided",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.userDecoded = { id: decoded.id };
    return next();
  } catch (err) {
    return res.status(401).json({
      error: "Unauthorized",
      error_description: "Token not provided",
    });
  }
};

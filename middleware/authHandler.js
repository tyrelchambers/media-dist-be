const decodeToken = require("../libs/decodeToken");
const authHandler = async (req, res, next) => {
  try {
    if (!req.headers.token && !req.query.token)
      return next({ error: "No token provided" });
    const token = req.headers.token || req.query.token;
    const userId = await decodeToken(token);

    if (!userId) return res.status(404).send({ error: "USER_NOT_FOUND" });

    res.locals.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authHandler;
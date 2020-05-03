const livesFactory = require("../factories/lives.factory");
const { switchError } = require("../services/application.service");

module.exports = {
  createLive: async (req, res) => {
    try {
      const response = await livesFactory.createLiveFactory({
        ...req.body,
        ...req.query,
        ...req.params,
        userId: req.userId,
      });
      return res.status(201).json(response);
    } catch (err) {
      const [status, error] = switchError(err);
      return res.status(status).json(error);
    }
  },
  getLives: async (req, res) => {
    try {
      const response = await livesFactory.getLivesFactory({
        ...req.body,
        ...req.query,
        ...req.params,
        userId: req.userId,
      });
      return res.status(200).json(response);
    } catch (err) {
      const [status, error] = switchError(err);
      return res.status(status).json(error);
    }
  },
};
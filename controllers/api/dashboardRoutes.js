const router = require("express").Router();
const { Dash } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newDash = await Dash.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDash);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const newDashData = await Dash.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!newDashData) {
      res.status(404).json({ message: "No entry found with this id!" });
      return;
    }

    res.status(200).json(dashData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

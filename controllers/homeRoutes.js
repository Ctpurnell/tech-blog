const router = require('express').Router();
const { Dash , User } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", async (req, res) => {
  res.redirect("/profile")
});


router.get('/profile/:id', async (req, res) => {
    try {
      const dashData = await Dash.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const dashBlog = dashData.get({ plain: true });
  
      res.render('login', { 
        ...dashBlog, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/profile', withAuth, async (req, res) => {
    try {
      const dashData = await Dash.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [ { model: Dash }],
      });
  
      const boardUser = dashData.get({ plain: true });
      console.log(user);
  
      res.render('profile', {
        ...boardUser,
        logged_in: true,
      });

    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  
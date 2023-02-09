const router = require('express').Router();
const { Dash , User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const dashData = await Dash.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const dash = dashData.map((dashBoard) => dashBoard.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        dash, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/dashboard/:id', async (req, res) => {
    try {
      const dashData = await Dash.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const board = dashData.get({ plain: true });
  
      res.render('dashboard', {
        ...board,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  
const sequelize = require('../config/connection');
const { User, Dash } = require('../models');

const userData = require('./userData.json');
const projectData = require('./dashData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const dash of dashData) {
    await Dash.create({
      ...dash,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

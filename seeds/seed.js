const sequelize = require("../config/connection");
const { User, Dash } = require("../models");

const userData = [
  {
    id: 1,
    name: "Chris",
    email: "ctp0941@gmail.com",
    password: "STP1994@"
  },
];




const dashData = [
  {
    name: "HTML",
    description: "Front end basic structure for web pages.",
    user_id: 1,
  },

  {
    name: "CSS",
    description: "Adds styling to your page.",
    user_id: 1,
  
  },
  {
    name: "javaScript",
    description: "Helps to make your page functional.",
    user_id: 1,
  
  },
];

const seedUsers = () => User.bulkCreate(userData);
const seedImages = () => Dash.bulkCreate(dashData);


const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedImages();
  console.log('\n----- USERS IMAGES -----\n');
  process.exit(0);
};


seedAll();

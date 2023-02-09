const User = require('./User');
const Dash = require('./Dash');

User.hasMany(Dash, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dash.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Dash };

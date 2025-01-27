const { DataTypes } = require('sequelize');
const Category = require('./Category');
const sequelize = require('../config/database'); // 

const Card = sequelize.define('Card', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryID:{
    type: DataTypes.INTEGER,

    references: {
      model: Category,
      key: 'id',
    },
  }

  // filename: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },

}, {
  tableName: 'cards', 
  timestamps: false,  
});
// connect category

Card.belongsTo(Category,{
  foreignKey: 'categoryID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Category.hasMany(Card, {
  foreignKey: 'categoryID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});



module.exports = Card;


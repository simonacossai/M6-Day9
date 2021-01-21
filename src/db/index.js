const { Sequelize, DataTypes } = require("sequelize");
const Article = require("./article");
const Category = require("./category");
const Author = require("./author");
const Review = require("./review");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

const models = {
  Article: Article(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Author: Author(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
};

Object.keys(models).forEach(modelName => {
    if('associate' in models[modelName]){
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
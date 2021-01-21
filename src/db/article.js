module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define("Article", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Article.associate = (models)=>{
     Article.belongsTo(models.Category)
     Article.belongsTo(models.Author)
     Article.hasMany(models.Review)

    };
    return Article;
  };
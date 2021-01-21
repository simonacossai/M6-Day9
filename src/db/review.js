module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    Review.associate =(models)=>{
        Review.belongsTo(models.Article)

       };
    return Review;
  };
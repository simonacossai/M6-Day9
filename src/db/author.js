module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("Author", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },  {
        timestamps: false,
      });
    Author.associate =(models)=>{
        Author.hasMany(models.Article)
       };
    return Author;
  };
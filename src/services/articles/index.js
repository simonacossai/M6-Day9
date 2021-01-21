const express = require("express");
const Article = require("../../db").Article;
const Category = require("../../db").Category;
const Review = require("../../db").Review;
const { Op } = require("sequelize");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Article.findAll({
        include: [{
          model: Category,
        },
    {
        model: Review
    }],
        where: req.query.content
          ? { content: { [Op.iLike]: "%" + req.query.content + "%" } }
          : {},
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Article.create(req.body);
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Article.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Article.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Article.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
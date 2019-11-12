const db = require("../mongodb_models");
console.log("Inside Cards Controller");
// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.DonatorCard
      .find()
      .then(dbModel => {
        console.log("Inside find all");
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.DonatorCard
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("Inside create function");
    db.DonatorCard
      .create(req.body)
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.DonatorCard
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.DonatorCard
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

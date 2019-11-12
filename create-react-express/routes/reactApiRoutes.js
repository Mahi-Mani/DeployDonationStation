const router = require("express").Router();
const cardsController = require("../controllers/cardsController");

console.log("Inside react api routes");

router.route("/allCards")
  .get(cardsController.findAll);

module.exports = router;

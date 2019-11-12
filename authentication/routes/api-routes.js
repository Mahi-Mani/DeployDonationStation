var db = require("../../models");

module.exports = function (app) {
    
    app.get("/api/:username/:password", function (req, res) {

        db.User.findOne({
            where: {
                username: req.params.username,
                password: req.params.password
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        })

    })

    app.post("/api/new/user", function (req,res) {

        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        })

    })

}
var db = require('../models');
var path = require('path');

module.exports = function (app) {

    app.get("/requestorcardform", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/assets/requestorcardform.html"));
    })

    app.get("/api/:userid", function (req, res) {

        db.User.findOne({
            where: {
                id: req.params.userid
            }
        }).then(function (result) {
            res.json(result);
        });

    })

    // app.get("/:id", function (req, res) {

    //     db.RequestorCard.findAll({}).then(function (data) {
    //         var requestorCardObject = {
    //             requestorCards: data
    //         };
    //         res.render("index2", requestorCardObject)
    //     });

    // });

    app.post("/api/new/requestorcard", function (req, res) {

        db.RequestorCard.create(req.body).then(function (dbRequestorCard) {
            res.json(dbRequestorCard);
        });

    });

    app.post("/api/new/donation", function (req, res) {

        db.Donation.create(req.body).then(function (dbDonation) {
            res.json(dbDonation);
        });

    });

    // *****************************************************************************

    // app.get("/donatorcards/:userid", function (req, res) {

    //     db.DonatorCard.findAll({
    //         where: {
    //             UserId: req.params.userid
    //         }
    //     }).then(function (dbDonatorCard) {
    //         res.json(dbDonatorCard);
    //     });

    // });

    app.get("/requests/:cardid/:userid", function (req, res) {

        db.Request.findAll({
            where: {
                DonatorCardId: req.params.cardid,
                accepted: null
            }
        }).then(function (data) {
            var requestsObject = {
                requests: data
            };
            res.render("requests", requestsObject)
        });

    });

    // *****************************************************************************

    // app.get("/requestorcards/:userid", function (req, res) {

    //     db.RequestorCard.findAll({
    //         where: {
    //             UserId: req.params.userid
    //         }
    //     }).then(function (dbRequestorCard) {
    //         res.json(dbRequestorCard);
    //     });

    // });

    app.get("/donations/:cardid/:userid", function (req, res) {

        db.Donation.findAll({
            where: {
                RequestorCardId: req.params.cardid,
                accepted: null
            }
        }).then(function (data) {
            var donationsObject = {
                donations: data
            };
            res.render("donations", donationsObject)
        });

    });

    // ******************************************************************************

    app.put("/api/donation/:requestorcardid/:userid", function (req, res) {
        console.log("ACCEPTED DONATION")
        db.Donation.update({
            accepted: req.body.accepted
        }, {
            where: {
                RequestorCardId: req.params.requestorcardid,
                UserId: req.params.userid,
            }
        }).then(function (dbDonation) {
            res.json(dbDonation);
        });
    });

    app.put("/api/updaterequestorcard/:requestorcardid", function (req, res) {
        console.log("UPDATE REQUESTOR CARD")
        console.log(req.params.requestorcardid)
        db.RequestorCard.findOne({
            where: {
                id: req.params.requestorcardid
            }
        }).then(function (result) {
            db.RequestorCard.update({
                numberneeded: result.numberneeded - req.body.amount
            }, {
                where: {
                    id: req.params.requestorcardid
                }
            }).then(function (ressy) {
                res.json(ressy);
            });
        })
    })

    // ******************************************************************************

    app.put("/api/request/:donatorcardid/:userid", function (req, res) {
        console.log("accepted request")
        db.Request.update({
            accepted: req.body.accepted
        }, {
            where: {
                DonatorCardId: req.params.donatorcardid,
                UserId: req.params.userid,
            }
        }).then(function (dbRequest) {
            res.json(dbRequest);
        });
    });

    app.put("/api/updatedonatorcard/:donatorcardid", function (req, res) {
        console.log("UPDATE DONATOR CARD")
        console.log(req.params.donatorcardid)
        db.DonatorCard.findOne({
            where: {
                id: req.params.donatorcardid
            }
        }).then(function (result) {
            console.log("HEEEEYYYYYY")
            console.log(result.itemnumber)
            db.DonatorCard.update({
                itemnumber: result.itemnumber - req.body.amount
            }, {
                where: {
                    id: req.params.donatorcardid
                }
            }).then(function (ressy) {
                console.log("AFTER UPDATE")
                res.json(ressy);
            });
        })
    })

    // ******************************************************************************

    app.delete("/api/delete/donation/:cardid/:userid", function (req, res) {
        db.Donation.destroy({
            where: {
                RequestorCardId: req.params.cardid,
                UserId: req.params.userid
            }
        }).then(function (result) {
            res.json(result);
        });
    });

    app.delete("/api/delete/request/:cardid/:userid", function (req, res) {
        db.Request.destroy({
            where: {
                DonatorCardId: req.params.cardid,
                UserId: req.params.userid
            }
        }).then(function (result) {
            res.json(result);
        });
    });

    // ******************************************************************************

    app.get("/api/acceptedrequests/:userid", function (req, res) {
        db.Request.findAll({
            where: {
                UserId: req.params.userid,
                accepted: 1
            }
        }).then(function (result) {
            res.json(result);
        });
    })

    app.get("/api/accepteddonations/:userid", function (req, res) {
        db.Donation.findAll({
            where: {
                UserId: req.params.userid,
                accepted: 1
            }
        }).then(function (result) {
            res.json(result);
        });
    })

    app.get("/api/deniedrequests/:userid", function (req, res) {
        db.Request.findAll({
            where: {
                UserId: req.params.userid,
                accepted: 0
            }
        }).then(function (result) {
            res.json(result);
        });
    })

    app.get("/api/denieddonations/:userid", function (req, res) {
        db.Donation.findAll({
            where: {
                UserId: req.params.userid,
                accepted: 0
            }
        }).then(function (result) {
            res.json(result);
        });
    })

}
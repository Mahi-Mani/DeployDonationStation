const router = require("express").Router();
var db = require("../models");
const mongoDb = require("../mongodb_models");
var path = require("path");
var login;
var uniqueUserId;
// const cardsController = require("../controllers/cardsController");
// var login = require("assets/js/app3.js");

module.exports = function (app) {

    app.get("/form", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/assets/form.html"));
    })

    app.get("/logout", function(req, res){
        login = false;
        console.log(login);
        res.json(login);
    })

    app.get("/login/:uniqueUserId", function(req, res){
        login = true;
        uniqueUserId = req.params.uniqueUserId;
        console.log(login);
        res.json(login);
    })

    // To retrive all donator and requestor cards from database
    app.get("/:id", function (req, res) {

        db.RequestorCard.findAll({
            where: {
                priority: 0
            }
        }).then(function (data) {

            db.DonatorCard.findAll({
                // order: db.DonatorCard.literal('enddate DESC')
                order: [['enddate', 'DESC']]
            }).then(function (result) {

                db.RequestorCard.findAll({
                    where: {
                        priority: 1
                    }
                }).then(function (priority) {

                    resultObj = {
                        priority: priority,
                        result: result,
                        requestorCards: data
                    }
                    // console.log(donatorCard.result);
                    console.log("MERGING RESULT OBJECTS");
                    console.log(resultObj);

                    if(login && req.params.id === uniqueUserId){
                    res.render("index", resultObj);
                    }
                    else{
                        console.log("Please Login First");
                    }
                })
            })
        });
    })
    // app.get("/:id", function(req, res){
    //     console.log("/:id route")
    //     console.log(req.params.id)
    //     db.DonatorCard.findAll({}).then(function(result){
    //         console.log(result);
    //         donatorCard = {
    //             result: result
    //         }
    //     res.render("index", donatorCard);
    // })


    // Server side javascript to create a new donator card
    app.post("/api/new/donatorcard", function (req, res) {

        db.DonatorCard.create({
            startdate: req.body.startDate,
            enddate: req.body.endDate,
            category: req.body.category,
            item: req.body.item,
            itemnumber: req.body.noOfItems,
            location: req.body.location,
            image: req.body.image,
            UserId: req.body.UserId,
            useremail: req.body.useremail
        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    })

    // Get all so that number needed column is checked
    app.get("/api/numberneeded", function (req, res) {
        db.RequestorCard.findAll({
        }).then(function (result) {
            console.log("FIND ALL QUERY RESULT");
            // console.log(result);
            // console.log(result.numberneeded);
            res.send(result);
        })

    })

    // To delete when number of items is zero from requestor card
    app.put("/api/delete/requestorcard/:id", function (req, res) {
        var id = req.params.id;

        db.RequestorCard.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            res.json(result);
        })
    })

    // Inserting into Mongodb
    app.post("/api/mongodb/donatorcard", function (req, res) {
        console.log("INSIDE ROUTE........");
        console.log(req.body);

        mongoDb.DonatorCard.create(req.body).then(function (dbDictionary) {
            console.log(dbDictionary);
            console.log("INSERTED INTO MONGOOSE TABLE");
        }).catch(function (err) {
            console.log(err);
        })
    })

    // Server side javascript to create a new request
    app.post("/api/new/request", function (req, res) {
        console.log(req.body);
        console.log("Inside new request table");

        db.Request.create({
            amount: req.body.amount,
            UserId: req.body.userId,
            DonatorCardId: req.body.donatorCardId,
            item: req.body.item,
            donatoremail: req.body.donatoremail
        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    })

    // To update donatorCard table
    app.put("/api/donator/update/:id", function (req, res) {
        var id = req.params.id;
        var amount = req.body.amount;

        console.log("CHECK");
        db.DonatorCard.findOne({
            where: { id: id }
        }).then(function (result) {
            console.log("Find Onequery result");
            console.log(result.itemnumber);
            db.DonatorCard.update({
                itemnumber: result.itemnumber - amount
            }, {
                where: {
                    id: id
                }
            })
        })


    })

    // To check number of items for a particular id
    app.get("/api/itemsnumber", function (req, res) {
        db.DonatorCard.findAll({
        }).then(function (result) {
            console.log("FIND ALL QUERY RESULT");
            // console.log(result);
            // console.log(result.itemnumber);
            res.send(result);
        })

    })

    // To delete when number of items is zero
    app.put("/api/delete/:id", function (req, res) {
        var id = req.params.id;

        db.DonatorCard.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            res.json(result);
        })
    })

    // To delete requestor card
    app.put("/api/deleteRequestorCard/:id", function (req, res) {
        var id = req.params.id;

        db.RequestorCard.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            res.json(result);
        })
    })

    // To delete Donator card
    app.put("/api/deleteDonatorCard/:id", function (req, res) {
        var id = req.params.id;

        db.DonatorCard.destroy({
            where: {
                id: id
            }
        }).then(function (result) {
            res.json(result);
        })
    })

    // Api route to get all cards for one user
    app.get("/allusercards/:id", function (req, res) {

        db.RequestorCard.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(function (data) {

            db.DonatorCard.findAll({
                where: {
                    UserId: req.params.id
                }
            }).then(function (result) {

                resultObj = {
                    result: result,
                    requestorCards: data
                }
                // console.log(donatorCard.result);
                console.log("MERGING RESULT OBJECTS");
                console.log(resultObj);
                res.render("index2", resultObj);
            })
        });
    })
}

// Validate.js dependency
// var validate = require("validate.js");

// Make sures that the whole document is ready
$(document).ready(function () {
    var id;
    var userId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    var login;
    // var userId = 1;
    var donatorCardId;
    checkNumberOfItems();

    // Logging In
    $("#login").on("click", function (event) {
        console.log("Inside login button");
        login = true;
    });

    // Grab all values entered by user when submit button is clicked
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        var startDate = $("#input-sdate").val().trim();
        var endDate = $("#input-edate").val().trim();
        var category = $("#dropdown-category :selected").text();
        var item = $("#input-item").val().trim();
        var noOfItems = $("#input-noOfItems").val().trim();
        var location = $("#input-location").val().trim();
        var image = $("#input-image").val().trim();
        if (!image) {
            switch (category) {
                case "Food":
                    image = "../assets/img/food.JPG"
                    break;
                case "Clothing":
                    image = "../assets/img/clothing.JPG"
                    break;
                case "School Supplies":
                    image = "../assets/img/schoolsupplies.JPG"
                    break;
                case "Household Items":
                    image = "../assets/img/householditems.JPG"
                    break;
                case "Cleaning Supplies":
                    image = "../assets/img/cleaningsupplies.JPG"
                    break;
                default:
                    image = "../assets/img/misc.JPG"
            }
        }
        validateForm(startDate, endDate, category, item, noOfItems, location);
        getUserEmail(startDate, endDate, category, item, noOfItems, location, image);
    })

    // Function to validate form
    function validateForm(startDate, endDate, category, item, noOfItems, location) {
        if (startDate === "") {
            $("#input-sdate").css({
                "border": "2px solid red"
            });
            $("#input-sdate").tooltip();
        }
        else {
            var isDate = validateDate(startDate);
            if (isDate) {
                $("#input-sdate").css({
                    "border": "2px solid green"
                });
            }
            else {
                $("#input-sdate").css({
                    "border": "2px solid black"
                });
                $("#input-sdate").tooltip();
            }
        }
        if (endDate === "") {
            $("#input-edate").css({
                "border": "2px solid red"
            });
            $("#input-edate").tooltip();
        }
        else {
            var isDate = validateDate(endDate);
            if (isDate) {
                $("#input-edate").css({
                    "border": "2px solid green"
                });
            }
            else {
                $("#input-edate").css({
                    "border": "2px solid black"
                });
                $("#input-edate").tooltip();
            }
        }
        if (category === "--None--") {
            $("#dropdown-category").css({
                "border": "2px solid red"
            });
            $("#dropdown-category").tooltip();
        }
        else {
            $("#dropdown-category").css({
                "border": "2px solid green"
            });
        }
        if (item === "") {
            $("#input-item").css({
                "border": "2px solid red"
            });
            $("#input-item").tooltip();
        }
        else {
            $("#input-item").css({
                "border": "2px solid green"
            });
        }
        if (noOfItems === "") {
            $("#input-noOfItems").css({
                "border": "2px solid red"
            });
            $("#input-noOfItems").tooltip();
        }
        else {
            if (typeof (noOfItems) == "number") {
                $("#input-noOfItems").css({
                    "border": "2px solid green"
                });
            }
            else {
                $("#input-noOfItems").css({
                    "border": "2px solid black"
                });
                $("#input-noOfItems").tooltip();
            }
        }
        if (location === "") {
            $("#input-location").css({
                "border": "2px solid red"
            });
            $("#input-location").tooltip();
        }
        else {
            $("#input-location").css({
                "border": "2px solid green"
            });
        }
    }

    // Function to validate Date
    function validateDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };

    function getUserEmail(startDate, endDate, category, item, noOfItems, location, image) {

            $.get("/api/" + userId, function () {
            }).then(function (result) {
                console.log("result.email: " + result.email)
                var useremail = result.email
                populateDonatorCards(startDate, endDate, category, item, noOfItems, location, image, useremail);
            })
    }

    // Function that populates values to Donator Cards
    function populateDonatorCards(startDate, endDate, category, item, noOfItems, location, image, useremail) {
        // New object that holds all user values
        var donation = {
            startDate: startDate,
            endDate: endDate,
            category: category,
            item: item,
            noOfItems: noOfItems,
            location: location,
            image: image,
            UserId: userId,
            useremail: useremail
        }

        // Post a new value to database
        $.ajax("/api/new/donatorcard", {
            type: "POST",
            data: donation
        }).then(function () {
            console.log("Inserted into table");
        })

        // Insert into MongoDB
        $.ajax("/api/mongodb/donatorcard", {
            type: "POST",
            data: donation
        }).then(function () {
            console.log("Inserted into mongod table");
        })

        window.location.reload();
    }

    // On click of add button generates a modal with a form to add new card
    $("#add-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside add button");
        $("#add-modal").modal("toggle");
    })

    // On click of close button in modal refreshes page
    $("#modal-close").on("click", function (event) {
        event.preventDefault();
        console.log("Inside close modal button");
        location.reload();
    })

    var useremail;
    var item;

    // On click of request donation button
    // $("#requestDonation").on("click", function (event) {
    $(document).on("click", "#requestDonation", function (event) {
        event.preventDefault();
        id = $(this).data("id");
        donatorCardId = id;
        console.log(id);
        item = $(this).data("item");
        console.log("grabbing item from #requestDonation: ")
        console.log(item)
        useremail = $(this).data("useremail");
        console.log("Inside request donation button");
        $("#request-donation-modal").modal("toggle");
    })

    // When user clicks request button, values are entered to request table
    $("#request-btn").on("click", function (event) {
        event.preventDefault();
        var amount = $("#input-amount").val().trim();
        console.log(amount);
        populateRequest(amount);
        // updateDonatorCards(amount, id);
    })

    function populateRequest(amount) {
        console.log("Inside populate request");
        var data = {
            amount: amount,
            userId: userId,
            donatorCardId: donatorCardId,
            item: item,
            donatoremail: useremail
        }
        // Post a new value to database
        $.ajax("/api/new/request", {
            type: "POST",
            data: data
        }).then(function () {
            console.log("Inserted into Request table");
        })
    }

    function updateDonatorCards(amount, id) {
        var newAmount = {
            amount: amount
        }
        $.ajax("/api/donator/update/" + id, {
            type: "PUT",
            data: newAmount
        }).then(
            function () {
                console.log("Updated");
            }
        )
    }

    // Function to check if number of items in card is zero
    function checkNumberOfItems() {
        $.ajax("/api/itemsnumber", {
            type: "GET"
        }).then(
            function (result) {
                // console.log(result);
                for (var i = 0; i < result.length; i++) {
                    if (result[i].itemnumber === 0) {
                        console.log(result[i].id);
                        deleteItems(result[i].id);
                    }
                }
            }
        )
    }

    // Function to delete items that has zero number of items
    function deleteItems(id) {
        $.ajax("/api/delete/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted");
            location.reload();
        })
    }

    // Function to delete cards
    $(".deleteRequestorCard").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax("/api/deleteRequestorCard/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted requestor card");
            location.reload();
        })

    })

    // Function to delete cards
    $(".deleteDonatorCard").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax("/api/deleteDonatorCard/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted donator card");
            location.reload();
        })

    })


})
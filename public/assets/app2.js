$(document).ready(function () {

    var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    var login = true;
    // var userid = 1;
    // var uniqueCardId;
    checkNumberOfItems();

    // style for all notifiations
    $.notify.addStyle('notifications', {
        html:
            "<div>" +
            "<div class='clearfix'>" +
            "<div class='title' data-notify-html='title'/>" +
            "<div class='buttons'>" +
            "<button class='btn-light hide'>Hide</button>" +
            "<div data-notify-html='button'></div>" +
            "</div>" +
            "</div>" +
            "</div>",
        classes: {
            base: {
                "color": "#155724",
                "background-color": "#d4edda",
                "border": "solid 1px #c3e6cb"
            },
            deny: {
                "color": "#721c24",
                "background-color": "#f8d7da",
                "border": "solid 1px #f5c6cb"
            }
        }
    });

    // Function to check if number of items in card is zero
    function checkNumberOfItems() {
        console.log("Inside numberof items needed");
        $.ajax("/api/numberneeded", {
            type: "GET"
        }).then(
            function (result) {
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    if (result[i].numberneeded === 0) {
                        console.log(result[i].id);
                        deleteRequestorCard(result[i].id);
                    }
                }
            }
        )
    }

    // Function to delete requestor cards that has number needed value zero
    function deleteRequestorCard(id) {
        $.ajax("/api/delete/requestorcard/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted requestor Card");
            location.reload();
        })
    }

    //listen for click events from this style
    $(document).on('click', '.closeRequestNotification', function () {
        $(this).trigger('notify-hide');
        var userid = $(this).data("userid");
        var cardid = $(this).data("cardid");
        deleteRequest(userid, cardid);
    });

    $(document).on('click', '.closeDonationNotification', function () {
        $(this).trigger('notify-hide');
        console.log("close donation notification")
        var userid = $(this).data("userid");
        var cardid = $(this).data("cardid");
        deleteDonation(userid, cardid);
    });

    $(document).on('click', '.hide', function () {
        $(this).trigger('notify-hide');
    })

    $("#viewNotifications").on("click", function (event) {
        event.preventDefault();
        showAcceptedRequests();
    })

    function showAcceptedRequests() {
        $.get("/api/acceptedrequests/" + userid, function (data) {
            console.log("Data from getting accepted request: ")
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var uniqueCardId = data[i].DonatorCardId;
                var uniqueButton = $("<button/>").append("Close");
                uniqueButton.data("userid", userid);
                uniqueButton.data("cardid", uniqueCardId);
                uniqueButton.attr("class", "btn-danger closeRequestNotification");
                $.notify({
                    title: "Your request of " + data[i].amount + " " + data[i].item + " has been accepted.<br>Please contact " + data[i].donatoremail + " to coordinate exchange.<br>Once you close this notificaiton, you will no longer be able to see this email address.",
                    button: uniqueButton
                }, {
                    style: 'notifications',
                    className: 'base',
                    autoHide: false,
                    clickToHide: false
                });
            }
        }).then(function () {
            showAcceptedDonations();
        })
    }

    function showAcceptedDonations() {
        $.get("/api/accepteddonations/" + userid, function (data) {
            console.log("Data from getting accepted donation: ")
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var uniqueCardId = data[i].RequestorCardId;
                var uniqueButton = $("<button/>").append("Close");
                uniqueButton.data("userid", userid);
                uniqueButton.data("cardid", uniqueCardId);
                uniqueButton.attr("class", "btn-danger closeDonationNotification");
                $.notify({
                    title: "Your donation of " + data[i].amount + data[i].item + "s has been accepted.<br>Please contact " + data[i].requestoremail + " to coordinate exchange.<br>Once you close this notificaiton, you will no longer be able to see this email address.",
                    button: uniqueButton
                }, {
                    style: 'notifications',
                    className: 'base',
                    autoHide: false,
                    clickToHide: false
                });
            }
        }).then(function () {
            showDeniedRequests();
        })
    }

    function showDeniedRequests() {
        $.get("/api/deniedrequests/" + userid, function (data) {
            console.log("Data from getting denied request: ")
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var uniqueCardId = data[i].DonatorCardId;
                var uniqueButton = $("<button/>").append("Close");
                uniqueButton.data("data-userid", userid);
                uniqueButton.data("data-cardid", uniqueCardId);
                uniqueButton.attr("class", "btn-danger closeRequestNotification");
                $.notify({
                    title: "Your request of " + data[i].amount + " " + data[i].item + " has been denied.<br>Please feel free to request from others.",
                    button: uniqueButton
                }, {
                    style: 'notifications',
                    className: 'deny',
                    autoHide: false,
                    clickToHide: false
                });
            }
        }).then(function () {
            showDeniedDonations();
        })
    }

    function showDeniedDonations() {
        $.get("/api/denieddonations/" + userid, function (data) {
            console.log("Data from getting denied donation: ")
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var uniqueCardId = data[i].RequestorCardId;
                var uniqueButton = $("<button/>").append("Close");
                uniqueButton.attr("userid", userid);
                uniqueButton.attr("cardid", uniqueCardId);
                uniqueButton.attr("class", "btn-danger closeDonationNotification");
                $.notify({
                    title: "Your donation of " + data[i].amount + data[i].item + "s has been accepted.<br>Please feel free to donate to others.",
                    button: uniqueButton
                }, {
                    style: 'notifications',
                    className: 'deny',
                    autoHide: false,
                    clickToHide: false
                });
            }
        })
    }

    $("#addRequestorCard").on("click", function (event) {
        event.preventDefault();
        var category = $("#requestorCardCategory").val().trim();
        var item = $("#requestorCardItem").val().trim();
        var location = $("#requestorCardLocation").val().trim();
        var numberneeded = $("#requestorCardNumberNeeded").val().trim();
        var priority = document.querySelector('input[name="requestorCardPriority"]:checked').value;
        var image = $("#requestorCardImage").val().trim();
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

        // if (!category || !item || !location || !numberneeded || !priority) {
        //     return;
        // } else {
        validateForm(category, item, location, numberneeded, priority);
        getUserEmail(category, item, location, numberneeded, priority, image);
        // }
    });

    // Validation Function
    function validateForm(category, item, location, numberneeded, priority) {
        if (category === "--None--") {
            $("#requestorCardCategory").css({
                "border": "2px solid red"
            });
            $("#requestorCardCategory").tooltip();
        }
        else {
            $("#requestorCardCategory").css({
                "border": "2px solid green"
            });
        }
        if (item === "") {
            $("#requestorCardItem").css({
                "border": "2px solid red"
            });
            $("#requestorCardItem").tooltip();
        }
        else {
            $("#requestorCardItem").css({
                "border": "2px solid green"
            });
        }
        if (location === "") {
            $("#requestorCardLocation").css({
                "border": "2px solid red"
            });
            $("#requestorCardLocation").tooltip();
        }
        else {
            $("#requestorCardLocation").css({
                "border": "2px solid green"
            });
        }
        if (numberneeded === "") {
            $("#requestorCardNumberNeeded").css({
                "border": "2px solid red"
            });
            $("#requestorCardNumberNeeded").tooltip();
        }
        else {
            if (typeof (numberneeded) == "number") {
                $("#requestorCardNumberNeeded").css({
                    "border": "2px solid green"
                });
            }
            else {
                $("#requestorCardNumberNeeded").css({
                    "border": "2px solid black"
                });
                $("#requestorCardNumberNeeded").tooltip();
            }
        }
        if (priority === "") {
            $("#requestorCardPriority").css({
                "border": "2px solid red"
            });
            $("#requestorCardPriority").tooltip();
        }
        else {
            $("#requestorCardPriority").css({
                "border": "2px solid green"
            });
        }
    }

    function getUserEmail(category, item, location, numberneeded, priority, image) {

        $.get("/api/" + userid, function () {
        }).then(function (result) {
            console.log("result.email: " + result.email)
            var useremail = result.email
            addRequestorCard(category, item, location, numberneeded, priority, image, useremail);
        })

    }

    function addRequestorCard(category, item, location, numberneeded, priority, image, useremail) {

        console.log("adding RequestorCard")
        createRequestorCard({
            category: category,
            item: item,
            location: location,
            numberneeded: numberneeded,
            priority: priority,
            image: image,
            UserId: userid,
            useremail: useremail
        });
    }

    function createRequestorCard(requestorCardData) {
        location.reload();
        $.post("/api/new/requestorcard", requestorCardData)
            .then(console.log("created new requestor card"));
    }

    var requestorcardid;
    var item;
    var useremail;

    $(".donate").on("click", function (event) {
        event.preventDefault();
        requestorcardid = $(this).data("id");
        item = $(this).data("item");
        useremail = $(this).data("useremail");
    });

    $("#offerDonation").on("click", function (event) {
        event.preventDefault();
        var amount = $("#offerDonationNumber").val().trim();
        if (!amount) {
            return;
        } else {
            makeDonation(amount);
        }
    })

    function makeDonation(amount) {
        console.log("making donation")
        createDonation({
            RequestorCardId: requestorcardid,
            UserId: userid,
            amount: amount,
            item: item,
            requestoremail: useremail
        });
    }

    function createDonation(donationData) {
        $.post("/api/new/donation", donationData)
            .then(function () {
                console.log("created new donation");
                location.reload();
            }
            );
    }

    $("#homeButton").on("click", function (event) {
        event.preventDefault();
        window.location = "/" + userid;
    });

    // **************************************************************************************************************************

    $(".viewRequests").on("click", function (event) {
        event.preventDefault();
        var viewRequestsForThisCardId = $(this).data("id")
        window.location = "/requests/" + viewRequestsForThisCardId + "/" + userid;
        getRequests(viewRequestsForThisCardId);
    });

    // function getDonatorCards() {
    //     $.get("/donatorcards/" + userid, function (res) {
    //         getRequests(res);
    //     })
    // }


    function getRequests(cardid) {
        // for (i = 0; i < results.length; i++) {
        $.get("/requests/" + cardid, function () {
            console.log("all requests for donator card with id: " + cardid)
        })
        // }
    }

    // **************************************************************************************************************************

    $(".viewDonations").on("click", function (event) {
        event.preventDefault();
        var viewDonationsForThisCardId = $(this).data("id")
        window.location = "/donations/" + viewDonationsForThisCardId + "/" + userid;
        getDonations(viewDonationsForThisCardId);
    });

    // function getRequestorCards() {
    //     $.get("/requestorcards/" + userid, function (res) {
    //         getDonations(res);
    //     })
    // }


    function getDonations(cardid) {
        // for (i = 0; i < results.length; i++) {
        $.get("/donations/" + cardid, function () {
            console.log("all donations for requestor card with id: " + cardid)
        })
        // }
    }

    $("#viewCards").on("click", function (event) {
        event.preventDefault();
        window.location = "/allusercards/" + userid;
    });

    // **************************************************************************************************************************

    $(".acceptDonation").on("click", updateDonation)
    $(".acceptDonation").on("click", updateRequestorCard)

    function updateDonation() {
        var acceptDonationRequestorCardId = $(this).data("requestorcardid");
        var acceptDonationUserId = $(this).data("userid");
        var updateAccepted = {
            accepted: true
        };
        $.ajax({
            method: "PUT",
            url: "/api/donation/" + acceptDonationRequestorCardId + "/" + acceptDonationUserId,
            data: updateAccepted
        }).then(console.log("updated card: " + acceptDonationRequestorCardId + " with user id: " + acceptDonationUserId + "to accepted"));
        location.reload();
    }

    function updateRequestorCard() {
        var acceptDonationRequestorCardId = $(this).data("requestorcardid");
        var amount = $(this).data("amount");
        var updateAcceptedRequestorCard = {
            amount: amount
        };
        $.ajax({
            method: "PUT",
            url: "/api/updaterequestorcard/" + acceptDonationRequestorCardId,
            data: updateAcceptedRequestorCard
        }).then(console.log("updated card: " + acceptDonationRequestorCardId));
    }

    // **************************************************************************************************************************

    $(".acceptRequest").on("click", updateRequest)
    $(".acceptRequest").on("click", updateDonatorCard)

    function updateRequest() {
        var acceptRequestDonatorCardId = $(this).data("donatorcardid");
        var acceptRequestUserId = $(this).data("userid");
        var updateAccepted = {
            accepted: true
        };
        $.ajax({
            method: "PUT",
            url: "/api/request/" + acceptRequestDonatorCardId + "/" + acceptRequestUserId,
            data: updateAccepted
        }).then(console.log("updated card: " + acceptRequestDonatorCardId + " with user id: " + acceptRequestUserId + "to accepted"));
        location.reload();
    }

    function updateDonatorCard() {
        var acceptRequestDonatorCardId = $(this).data("donatorcardid");
        var amount = $(this).data("amount");
        var updateAcceptedDonatorCard = {
            amount: amount
        };
        $.ajax({
            method: "PUT",
            url: "/api/updatedonatorcard/" + acceptRequestDonatorCardId,
            data: updateAcceptedDonatorCard
        }).then(console.log("updated card: " + acceptRequestDonatorCardId));
    }

    // **************************************************************************************************************************

    $(".denyDonation").on("click", denyDonation)

    function denyDonation() {
        var denyDonationRequestorCardId = $(this).data("requestorcardid");
        var denyDonationUserId = $(this).data("userid");
        var updateDenied = {
            accepted: false
        };
        $.ajax({
            method: "PUT",
            url: "/api/donation/" + denyDonationRequestorCardId + "/" + denyDonationUserId,
            data: updateDenied
        }).then(console.log("updated card: " + denyDonationRequestorCardId + " with user id: " + denyDonationUserId + "to denied"));
        location.reload();
    }

    function deleteDonation(userid, cardid) {
        $.ajax({
            method: "DELETE",
            url: "/api/delete/donation/" + cardid + "/" + userid
        }).then(function () {
            console.log("deleted donation")
            location.reload();
        });
    }

    $(".denyRequest").on("click", denyRequest)

    function denyRequest() {
        var denyRequestDonatorCardId = $(this).data("donatorcardid");
        var denyRequestUserId = $(this).data("userid");
        var updateDenied = {
            accepted: false
        };
        $.ajax({
            method: "PUT",
            url: "/api/request/" + denyRequestDonatorCardId + "/" + denyRequestUserId,
            data: updateDenied
        }).then(console.log("updated card: " + denyRequestDonatorCardId + " with user id: " + denyRequestUserId + "to denied"));
        location.reload();
    }

    function deleteRequest(userid, cardid) {
        $.ajax({
            method: "DELETE",
            url: "/api/delete/request/" + cardid + "/" + userid
        }).then(function () {
            console.log("deleted request")
            location.reload();
        });
    }

})
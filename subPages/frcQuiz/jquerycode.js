$(document).ready(function () {
    $("#testResponse").click(function() {
        var settings = {
            url: "https://www.thebluealliance.com/api/v3/teams/2025/2",
            method: "GET",
            timeout: 0,
            crossDomain: true,
            headers: {
                "X-TBA-Auth-Key": "kLbYH18vYpqktXGnU716sI42wDwximdQ4kQ9nHn6xJxMUZOF3dDG8P1zRIrT773g ",
            },
            success: function(result) {
                console.dir(result);
            }
        };
        $.ajax(settings).done(function (data) {
            console.dir(data);
        });
    })
    // var settings = {
    //     url: "https://www.thebluealliance.com/api/v3/teams/2025/2",
    //     method: "GET",
    //     timeout: 0,
    //     crossDomain: true,
    //     headers: {
    //         "X-TBA-Auth-Key": "kLbYH18vYpqktXGnU716sI42wDwximdQ4kQ9nHn6xJxMUZOF3dDG8P1zRIrT773g ",
    //     },
    //     success: function(result) {
    //         console.dir(result);
    //     }
    // };
    // $.ajax(settings).done(function (data) {
    //     console.dir(data);
    // });
});

function getRandomTeam(year, rangeMin, rangeMax) {
    var rangeDifference = rangeMax-rangeMin;
    var InitialPage = Math.floor(rangeMin/1000)+1;
    var totalPages = Math.floor(rangeDifference/1000)+InitialPage;
    var teamName = "";
    var teamNumber = 0;
}
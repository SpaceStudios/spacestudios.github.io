var alphabet = ["A", "B", "C", "D"];
var questionDetails = {
    correctAnswer : 1,
    answer: "idk",
    currentlySelected: 0
}

var QuizSettings = JSON.parse(window.localStorage.getItem("quizSettings"));

function getRandomTeam(year, rangeMin, rangeMax, option) {
    var rangeDifference = rangeMax-rangeMin;
    var InitialPage = Math.floor(rangeMin/500);
    var totalPages = Math.floor(rangeDifference/500)+InitialPage;
    var teamName = "Blue Cheese";
    var teamNumber = 1086;
    var page = pickRandom(InitialPage, totalPages);

    var pageData = [];
    //JQuery Settings
    var settings = {
        url: "https://www.thebluealliance.com/api/v3/teams/"+year+"/"+page,
        method: "GET",
        timeout: 0,
        crossDomain: true,
        headers: {
            "X-TBA-Auth-Key": "kLbYH18vYpqktXGnU716sI42wDwximdQ4kQ9nHn6xJxMUZOF3dDG8P1zRIrT773g ",
        }
    };
    $.ajax(settings).done(function (data) {
        pageData = data;
        var teamDetailObject = data[pickRandom(1,data.length)-1];
        while (teamDetailObject.team_number < QuizSettings.TeamRangeMin || teamDetailObject.team_number > QuizSettings.TeamRangeMax) {
            teamDetailObject = data[pickRandom(1,data.length)-1];
        }
        if (teamDetailObject.nickname != questionDetails.answer) {
            if (option == questionDetails.correctAnswer) {
                document.getElementById("Question").innerText = "What is the name of FRC Team "+teamDetailObject.team_number+"?";
                questionDetails.answer = teamDetailObject.nickname;
            }
            document.getElementById("option"+option).innerText = alphabet[option-1]+": "+teamDetailObject.nickname;
        }
    });
    var teamDetails = {
        Name: teamName,
        Number: teamNumber
    };
    return teamDetails;
}

function pickRandom(minimum, maximum) {
    return Math.floor((Math.random()*(maximum-minimum))+0.5)+minimum;
}

function selectOption1() {
    questionDetails.currentlySelected = 1;
    console.log(questionDetails.currentlySelected);
}

function selectOption2() {
    questionDetails.currentlySelected = 2;
    console.log(questionDetails.currentlySelected);
}

function selectOption3() {
    questionDetails.currentlySelected = 3;
    console.log(questionDetails.currentlySelected);
}

function selectOption4() {
    questionDetails.currentlySelected = 4;
    console.log(questionDetails.currentlySelected);
}

function submit() {
    if (questionDetails.currentlySelected == questionDetails.correctAnswer) {
        QuizSettings.CorrectQuestions += 1;
    }
    window.localStorage.setItem("quizSettings", JSON.stringify(QuizSettings));
}

function loadQuestion() {
    console.dir(QuizSettings);
    console.log(QuizSettings.QuizYear);
    QuizSettings.CurrentQuestion += 1;
    document.getElementById("category").innerText = QuizSettings.QuizYear+" Season FRC Team Name/Number ("+QuizSettings.TeamRangeMin+"-"+QuizSettings.TeamRangeMax+")";
    document.getElementById("questionNumber").innerText = "Question: "+QuizSettings.CurrentQuestion+"/"+QuizSettings.QuizQuestions;
    var correctOption = pickRandom(1,4);
    questionDetails.correctAnswer = correctOption;
    var teamObject = getRandomTeam(QuizSettings.QuizYear, QuizSettings.TeamRangeMin, QuizSettings.TeamRangeMax, correctOption);
    var correctLetter = alphabet[correctOption-1];
    document.getElementById("Question").innerText = "What is the name of FRC Team "+teamObject.Number+"?";
    document.getElementById("option"+correctOption).innerText = correctLetter+": "+teamObject.Name;
    for (var i=1; i<=4; i++) {
        if (i != correctOption) {
            getRandomTeam(QuizSettings.QuizYear, QuizSettings.TeamRangeMin, QuizSettings.TeamRangeMax, i);
        }
    }
    document.getElementById("option1").addEventListener("click", selectOption1, false);
    document.getElementById("option2").addEventListener("click", selectOption2, false);
    document.getElementById("option3").addEventListener("click", selectOption3, false);
    document.getElementById("option4").addEventListener("click", selectOption4, false);
    document.getElementById("submit").addEventListener("click", submit, false);
    document.getElementById("check").addEventListener("click", submit, false);
    if (parseInt(QuizSettings.CurrentQuestion) < parseInt(QuizSettings.QuizQuestions)) {
        document.getElementById("submit").setAttribute("href", "question.html");
        document.getElementById("submit").innerText = "Submit";
    } else {
        document.getElementById("submit").setAttribute("href", "score.html");
        document.getElementById("submit").innerText = "Submit and Check Score";
    }
}


$(document).ready( function() {
    loadQuestion();
});
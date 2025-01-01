var QuizSettings = {};
var QuestionProperties = {
    question: "idk",
    answer: "a"
};
var HasErrors = false;
if (document.getElementById("create") != null) {
    document.getElementById("create").addEventListener("click", checkValues, false);
    document.getElementById("start").addEventListener("click", startQuiz, false);
}

function pickRandom(minimum, maximum) {
    return Math.floor((Math.random()*(maximum-minimum))+0.5)+minimum;
}

function checkValues() {
    var Errors = "";
    var Year = document.getElementById("year").value;
    var teamNumMin = document.getElementById("rangeMin").value;
    var teamNumMax = document.getElementById("rangeMax").value;
    var questions = document.getElementById("questions").value;
    if (Year < 2002) {
        console.error("Year is less than minumum (2002)");
        Errors += "<p>Year is less than minumum (2002)</p>";
        HasErrors = true;
    }
    if (Year > 2025) {
        console.error("Year is greater than maximum (2025)");
        Errors += "<p>Year is greater than maximum (2025)</p>"; 
        HasErrors = true;
    }
    if (parseInt(teamNumMin) > parseInt(teamNumMax)) {
        console.error("The range minimum is set higher than the maximum");
        Errors += "<p>The range minimum is set higher than the maximum</p>";
        HasErrors = true;
    }
    if (parseInt(teamNumMax) <= 800) {
        console.error("Range Max must be higher than 800")
        Errors += "<p>Range Max must be higher than 800</p>";
        HasErrors = true;
    }
    if (parseInt(teamNumMin) < 1) {
        console.error("Range Min must be greater than or equal to 1")
        Errors += "<p>Range Min must be greater than or equal to 1</p>";
        HasErrors = true;
    }
    if (parseInt(questions) < 1) {
        console.error("The amount of questions must be greater than or equal to 1");
        Errors += "<p>The amount of questions must be greater than or equal to 1</p>";
        HasErrors = true;
    }
    console.log({
        CompYear:parseInt(Year),
        rangeMin: parseInt(teamNumMin),
        rangeMax: parseInt(teamNumMax),
        questionAmount: parseInt(questions)
    });
    var ErrorElement = document.getElementById("errors");
    if (HasErrors) {
        ErrorElement.classList.remove("hidden");
        ErrorElement.innerHTML = Errors;
    } else {
        var StartButton = document.getElementById("start");
        StartButton.classList.remove("hidden");
        ErrorElement.classList.add("hidden");
        QuizSettings = {
            QuizYear: parseInt(Year),
            QuizQuestions: parseInt(questions),
            TeamRangeMax: parseInt(teamNumMax),
            TeamRangeMin: parseInt(teamNumMin),
            CorrectQuestions: 0,
            CurrentQuestion: 0
        };
        window.localStorage.setItem("quizSettings", JSON.stringify(QuizSettings));
    }
}

function startQuiz() {
    QuizSettings.CurrentQuestion = 1;
    QuizSettings.CorrectQuestions = 0;
    window.localStorage.setItem("quizSettings", JSON.stringify(QuizSettings));
    console.log(QuizSettings);
}


var quizSettings = JSON.parse(window.localStorage.getItem("quizSettings"));

$(document).ready(function (){
    document.getElementById("scoredisplay").innerText = "Your Score was "+quizSettings.CorrectQuestions+"/"+quizSettings.QuizQuestions;
    document.getElementById("percent").innerText = "Your Percentage of correct answers is "+(Math.floor((quizSettings.CorrectQuestions/quizSettings.QuizQuestions)*1000)/10)+"%";
})
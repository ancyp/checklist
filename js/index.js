
$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: false,
        wrap: false
    });

    $('#myCarousel').bind('mousewheel', function () {
        $(this).carousel('next');
    });

    var getQuestionsURL = "https://1448e1b4-4598-4d86-8465-e6f23cf4d893.mock.pstmn.io/list"
    var jqxhr = $.getJSON(getQuestionsURL, function (data) {
        var questions = [];
        dat = data;
        addQuestions(getQuestions(data));

        var indicatorElement = document.getElementsByTagName("li")[0];
        indicatorElement.classList.add("active");
    })
        .fail(function () {
            alert("error");
        });


});



function getQuestions(data) {
    var arr = data.baseQuestionIDs
    var questions = []
    for (var index in data) {
        ques = data[index];
        questions.push({"id": ques._id, "name":ques.name});
    }
    return questions;
}


function addQuestions(questionList) {
    var questions = document.getElementById("questions-row");
    for (var index = 0; index < questionList.length; index++) {
        questions.appendChild(makeQuestionRow(questionList[index]));
    }
}

function makeQuestionRow(question) {

    var a = document.createElement("a");
    a.setAttribute("href", "questions.html?_id="+question.id);

    var row = document.createElement("div");

    row.setAttribute("class", "row question-row");

    var title = document.createElement("h3");
    title.setAttribute("class","text-center");
    title.appendChild(document.createTextNode(question.name));

    var titleDiv = document.createElement("div");
    
    var linkDiv =  document.createElement("div");
    
    titleDiv.appendChild(title);
    row.appendChild(titleDiv);
    row.appendChild(linkDiv);
     a.appendChild(row);
    return a;
}


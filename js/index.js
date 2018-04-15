
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

    var row = document.createElement("div");
    row.setAttribute("class", "row question-row");

    var title = document.createElement("h3");
    title.appendChild(document.createTextNode(question.name));

    var titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "col-lg-5 col-md-5 col-sm-5 col-xs-5 customs-p");

    var viewLink = document.createElement("a");
    viewLink.setAttribute("class", "medium customs-margin");
    viewLink.appendChild(document.createTextNode("view"));
    viewLink.setAttribute("href", "questions.html?_id="+question.id);

    var linkDiv =  document.createElement("div");
    linkDiv.setAttribute("class", "col-lg-3 col-md-3 col-sm-3 col-xs-3 pull-right")

    linkDiv.appendChild(viewLink);
    titleDiv.appendChild(title);
    row.appendChild(titleDiv);
    row.appendChild(linkDiv);
    return row;
}


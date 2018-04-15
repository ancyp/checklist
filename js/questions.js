var dat;

$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: false,
        wrap: false
    });

    $('#myCarousel').bind('mousewheel', function () {
        $(this).carousel('next');
    });
    var tech = getUrlParameter('_id');

    
    var getQuestionsURL = "https://c063eda5-5d46-4e06-a70d-ee70f739806d.mock.pstmn.io/qq?_id="+tech
    var jqxhr = $.getJSON(getQuestionsURL, function (data) {
        var questions = [];
        dat = data;
        setTitle(data.name);
        addItemsToCheckList(data.baseActions);
        addQuestions(getQuestions(data), flattenAnswers(data.allAnswers));

        var indicatorElement = document.getElementsByTagName("li")[0];
        indicatorElement.classList.add("active");
    })
        .fail(function () {
            alert("error");
        });


});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function addFromButtonToChecklist() {
    $('#myCarousel').carousel('next');
    if (this.getAttribute('data-action') !== "") {
        var storedArray = this.getAttribute('data-action').split(",");
        addItemsToCheckList(storedArray);
    }
    if (this.getAttribute('data-questions') !== "") {
        var storedArray = this.getAttribute('data-questions').split(",");
        appendQuestions(storedArray);
    }
    this.classList="col-md-1 button button-clicked";

}

function appendQuestions(quesNumbers) {

    for (var i = 0; i < quesNumbers.length; i++) {

    }
    var carousel = document.getElementsByClassName("carousel-inner")[0];
    var carouselIndicator = document.getElementsByClassName("carousel-indicators")[0];

    var map = flattenQuestions(dat.allQuestions);
    var answersMap = flattenAnswers(dat.allAnswers);
    var ques = [];
    for (var index in quesNumbers) {
        ques.push(map[quesNumbers[index]]);
    }


    for (var question in ques) {
        var itemDiv = makeQuestionDiv(ques[question], answersMap);
        carousel.appendChild(itemDiv);
        carouselIndicator.appendChild(makeIndicatorElement(question));
    }
}


function flattenQuestions(arr) {
    var map = {};
    for (var index in arr) {
        map[arr[index].id] = arr[index];
    }
    return map;
}


function getQuestions(data) {
    var map = flattenQuestions(data.allQuestions);
    var ques = [];
    var arr = data.baseQuestionIDs
    for (var index in arr) {
        ques.push(map[arr[index]]);
    }
    return ques;
}

function flattenAnswers(arr) {
    var map = {};

    for (var index in arr) {
        map[arr[index].id] = { "name": arr[index].name, "actions": arr[index].actions, "resultingQuestionIDs": arr[index].resultingQuestionIDs };
    }
    return map;
}

function addItemsToCheckList(itemsList) {
    var checkList = document.getElementById("check-list");
    for (var item in itemsList) {
        var litem = document.createElement("li");
        litem.classList.add("list-group-item");
        litem.classList.add("fade")
        litem.appendChild(createCheckbox(itemsList[item]));
        litem.appendChild(document.createTextNode(itemsList[item]))
        checkList.appendChild(litem);
    }
}

function createCheckbox(text) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    return checkbox;
}

function setTitle(titleText) {
    $("#question-title").html(titleText);
}

function addQuestions(questionList, answersMap) {
    var carousel = document.getElementsByClassName("carousel-inner")[0];
    var carouselIndicator = document.getElementsByClassName("carousel-indicators")[0];

    for (var question in questionList) {
        var itemDiv = makeQuestionDiv(questionList[question], answersMap);
        if (question == 0) {
            itemDiv.classList.add("active");
        }
        carousel.appendChild(itemDiv);
        carouselIndicator.appendChild(makeIndicatorElement(question));
    }
}

function makeIndicatorElement(index) {
    var indicatorElement = document.createElement("li");
    //todo: don't change div name!
    indicatorElement.setAttribute("data-target", "#myCarousel");
    indicatorElement.setAttribute("data-slide-to", index.toString());
    return indicatorElement;
}

function makeQuestionDiv(question_obj, answersMap) {
    var containerDiv = document.createElement("div");
    containerDiv.appendChild(makeQuestionSpan(question_obj.name));
    options = []
    for (var index = 0; index < question_obj.answerIDs.length; index++) {
        options.push(answersMap[question_obj.answerIDs[index]]);
    }
    containerDiv.appendChild(makeOptionsRow(options));

    var carouselContent = document.createElement("div");
    carouselContent.classList.add("carousel-content");
    carouselContent.appendChild(containerDiv);


    var itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    itemDiv.appendChild(carouselContent);

    return itemDiv;
}


function makeQuestionSpan(questionText) {
    var questionSpan = document.createElement("span");
    questionSpan.classList.add("question");

    questionSpan.appendChild(document.createTextNode(questionText));

    return questionSpan;
}

function makeOptionsRow(options) {
    var optionsRow = document.createElement("div");
    optionsRow.classList.add("options");
    optionsRow.classList.add("row");

    for (var index = 0; index < options.length; index++) {
        optionsRow.appendChild(makeOptionsButton(options[index]));

    }
    return optionsRow;
}

function makeOptionsButton(option) {
    var newButton = document.createElement("button");
    newButton.appendChild(document.createTextNode(option.name));
    newButton.classList.add("col-md-1");
    newButton.classList.add("button");

    var actions = [];
    for (var index = 0; index < option.actions.length; index++) {
        actions.push(option.actions[index]);
    }


    var ques = [];
    for (var index = 0; index < option.resultingQuestionIDs.length; index++) {
        ques.push(option.resultingQuestionIDs[index]);
    }

    newButton.setAttribute('data-action', actions);
    newButton.setAttribute('data-questions', ques);
    newButton.onclick = addFromButtonToChecklist;

    return newButton;
}
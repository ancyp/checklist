$(document).ready(function () {

    $('#myCarousel').carousel({
        interval: false,
        wrap: false
    });

    $('#myCarousel').bind('mousewheel', function () {
        $(this).carousel('next');
    });

    var getQuestionsURL = "https://25380aa8-6988-41de-a143-e52a18c3b282.mock.pstmn.io/q"
    var jqxhr = $.getJSON(getQuestionsURL, function (data) {
        var questions = [];
        setTitle(data.name);
        addItemsToCheckList(data.baseActions);
        addQuestions(data.allQuestions, flattenAnswers(data.allAnswers));
    })
        .fail(function () {
            alert("error");
        });


});

function addFromButtonToChecklist() {
    $('#myCarousel').carousel('next');
    if (this.getAttribute('data-action') === "") { return; }
    var storedArray = this.getAttribute('data-action').split(",");
    addItemsToCheckList(storedArray);
}

function flattenAnswers(arr) {
    var map = {};

    for (var index in arr) {
        map[arr[index].id] = { "name": arr[index].name, "actions": arr[index].actions };
    }
    return map;
}

function addItemsToCheckList(itemsList) {
    var checkList = document.getElementById("check-list");
    for (var item in itemsList) {
        var litem = document.createElement("li");
        litem.classList.add("list-group-item");
        litem.appendChild(createCheckbox(itemsList[item]));
        litem.appendChild(document.createTextNode(itemsList[item]))
        checkList.appendChild(litem);
    }
}

function createCheckbox(text){
    var checkbox=document.createElement("input");
    checkbox.type="checkbox";
    return checkbox;
}

function setTitle(titleText) {
    $("#question-title").html(titleText);
}

function addQuestions(questionList, answersMap) {
    var carousel = document.getElementsByClassName("carousel-inner")[0];

    for (var question in questionList) {
        var itemDiv = makeQuestionDiv(questionList[question], answersMap);
        if (question == 0) {
            itemDiv.classList.add("active");
            console.log(itemDiv.classList);
        }
        carousel.appendChild(itemDiv);
    }

    var carouselIndicator = document.getElementsByClassName("carousel-indicators")[0];

    carouselIndicator.appendChild(makeIndicatorElement(0));
    carouselIndicator.appendChild(makeIndicatorElement(1));
    carouselIndicator.appendChild(makeIndicatorElement(2));
    carouselIndicator.appendChild(makeIndicatorElement(3));
}

function makeIndicatorElement(index) {
    var indicatorElement = document.createElement("li");
    //todo: don't change div name!
    indicatorElement.setAttribute("data-target", "#myCarousel");
    indicatorElement.setAttribute("data-slide-to", index.toString());
    if (index === 0) {
        indicatorElement.classList.add("active");
    }

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
    console.log("option " + option);
    var newButton = document.createElement("button");
    newButton.appendChild(document.createTextNode(option.name));
    newButton.classList.add("col-md-1");
    newButton.classList.add("button");

    var actions = [];
    for (var index = 0; index < option.actions.length; index++) {
        actions.push(option.actions[index]);
    }

    newButton.setAttribute('data-action', actions);
    newButton.onclick = addFromButtonToChecklist;

    return newButton;
}

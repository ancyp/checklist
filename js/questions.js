$(document).ready(function () {

    $('#myCarousel').carousel({
        interval: false
    });

    $('#myCarousel').bind('mousewheel', function () {
        $(this).carousel('next');
    });

    addQuestions();

    $(".button").click(function () {
        $('#myCarousel').carousel('next');

    });

});


function addQuestions() {
    var carousel = document.getElementsByClassName("carousel-inner")[0];
    carousel.appendChild(makeQuestionDiv(0));
    carousel.appendChild(makeQuestionDiv(1));
    carousel.appendChild(makeQuestionDiv(2));
    carousel.appendChild(makeQuestionDiv(3));

    // carousel.childNodes[0].classList.add["active"];


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

function makeQuestionDiv(question_obj) {
    var containerDiv = document.createElement("div");
    containerDiv.appendChild(makeQuestionSpan("This is a question a really long question. Does it take up multiple lines or does it go off the page"));
    containerDiv.appendChild(makeOptionsRow(["option1", "option2", "option3", "option4"]));


    var carouselContent = document.createElement("div");
    carouselContent.classList.add("carousel-content");
    carouselContent.appendChild(containerDiv);


    var itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    if (question_obj === 0) {
        itemDiv.classList.add("active");
    }
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
    optionsRow.appendChild(makeOptionsButton(options[0]));
    optionsRow.appendChild(makeOptionsButton(options[1]));
    optionsRow.appendChild(makeOptionsButton(options[2]));
    optionsRow.appendChild(makeOptionsButton(options[3]));

    return optionsRow;
}

function makeOptionsButton(optionText) {

    var newButton = document.createElement("button");
    newButton.appendChild(document.createTextNode(optionText));
    newButton.classList.add("col-md-1");
    newButton.classList.add("button");

    return newButton;
}

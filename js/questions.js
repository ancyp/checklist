$( document ).ready(function() {

    $('#myCarousel').carousel({
        interval: false
    }); 

    $('#myCarousel').bind('mousewheel', function() {
        $(this).carousel('next');
    });

    $(".button").click(function() {
        $('#myCarousel').carousel('next');

    });
});



function add_question(){
    var question = "Question 1";
    var options= ["option 1","option 2", "option 3"];

    
}
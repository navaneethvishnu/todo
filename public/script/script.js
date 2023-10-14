$('.item-checkbox').click(function() { //on click of any checkbox with this class name this will trigger
    var id = $(this).attr('id'); // store the id of the clicked checkbox
    $(".todolist-items")[id].classList.toggle("completed"); //will add the class to the selected class iteam. here we need to define like array.
});



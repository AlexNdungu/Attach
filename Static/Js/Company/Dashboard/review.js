//Here we take the 3 inputs
let review = document.getElementById('goToPost')

let post_name = document.getElementById('post_name');
let review_name = document.getElementById('review_name');

let level_put2 = document.getElementById('level_put');
let review_level = document.getElementById('review_level')

let level_put3 = document.getElementById('level_put1');
let select_location = document.getElementById('select_location');

let richEdit = document.getElementById('richEdit');
let review_rich_body = document.getElementById('review_rich_body');

//Give them event listeners
review.addEventListener('click', ()=> {

    //The job name
    review_name.innerText = post_name.value;

    //Jov level
    review_level.innerText = level_put2.value;

    //Location
    select_location.innerText = level_put3.value;

    //Description
    review_rich_body.innerHTML = richEdit.innerHTML;

});


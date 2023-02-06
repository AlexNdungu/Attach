//Lets get all the neccessary items
let heatBtn = document.getElementById('heat_Map');
let pinBtn = document.getElementById('pins_Map');

let mapSelf = document.getElementById('mapSelf');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

//Add Event listiner click
//Heat
heatBtn.addEventListener('click', ()=> {
    console.log('click')

    //Remove the map
    mapSelf.innerHTML = '';

    let formData = new FormData();

    formData.append('inst','Heat');

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/lecturer/studFol/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response.data)

            mapSelf.innerHTML = response.data
            
        },
        error: function(error){
            
        }
    });

});

//Pins
pinBtn.addEventListener('click', ()=> {
    console.log('click')

    //Remove the map
    mapSelf.innerHTML = '';

    let formData = new FormData();

    formData.append('inst','Pins');

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/lecturer/studFol/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response.data)

            mapSelf.innerHTML = response.data
            
        },
        error: function(error){
            
        }
    });

});
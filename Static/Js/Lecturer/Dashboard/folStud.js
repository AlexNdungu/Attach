//Lets get all the neccessary items
let heatBtn = document.getElementById('heat_Map');
let pinBtn = document.getElementById('pins_Map');
let numberBtn = document.getElementById('number_Map');
let oneCountys = document.getElementsByClassName('oneCounty');

let mapSelf = document.getElementById('mapSelf');
let countyNames = document.getElementsByClassName('countyName')

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

            mapSelf.innerHTML = response.data
            
        },
        error: function(error){
            
        }
    });

});

//The number 
numberBtn.addEventListener('click', ()=> {
    console.log('click')

    //Remove the map
    mapSelf.innerHTML = '';

    let formData = new FormData();

    formData.append('inst','Number');

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/lecturer/studFol/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            mapSelf.innerHTML = response.data
            
        },
        error: function(error){
            
        }
    });

});

//Region
for(let a = 0; a < oneCountys.length; a++){

    oneCountys[a].addEventListener('click', ()=> {

        //Close the modal
        document.getElementById('closeModal').click();

        console.log(countyNames[a].innerHTML)

        mapSelf.innerHTML = '';

        let formData = new FormData();

        formData.append('inst','Region');

        formData.append('county',countyNames[a].innerHTML);

        formData.append('csrfmiddlewaretoken', csrf[0].value);

        $.ajax({
            type:'POST',
            url:'/lecturer/studFol/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){

                mapSelf.innerHTML = response.data
                
            },
            error: function(error){
                
            }
        });

    });

}
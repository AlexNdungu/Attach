//Lets get all the neccessary items
let heatBtn = document.getElementById('heat_Map');
let pinBtn = document.getElementById('pins_Map');
let numberBtn = document.getElementById('number_Map');
let oneCountys = document.getElementsByClassName('oneCounty');

let mapSelf = document.getElementById('mapSelf');
let countyNames = document.getElementsByClassName('countyName');
let Activity = document.getElementById('Activity');

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

            //Change The span
            Activity.innerHTML = 'Heat Map';
            
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

            Activity.innerHTML = 'Location Pins'
            
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

            Activity.innerHTML = 'Region Numbers'
            
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

                //Change County
                Activity.innerHTML = countyNames[a].innerHTML;
                
            },
            error: function(error){
                
            }
        });

    });

}


//Now lets focus on a button
let men = document.getElementsByClassName('men');

for(let a = 0; a < men.length; a++){

    men[a].addEventListener('click', ()=> {

        for(let b = 0; b < men.length; b++){

            if(men[b].classList.contains('m_act')){

                men[b].classList.remove('m_act')

            }

        }

        men[a].classList.add('m_act');

    })

}
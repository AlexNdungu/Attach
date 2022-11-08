
//Update with Current location

let currentAddress = document.getElementById('Address');
let currentCountry = document.getElementById('Country');
let currentCounty = document.getElementById('County');
let currentTown = document.getElementById('Town');
let currentLatitute = document.getElementById('Latitude');
let currentLongitude = document.getElementById('Longitude');
let csrf = document.getElementsByName('csrfmiddlewaretoken');

 
//The button for submit
let submitCurrentActive = document.getElementById('submitCurrentActive');

submitCurrentActive.addEventListener('click', ()=> {

    //console.log('click');

    document.getElementById('submitCurrent').click();

});

//The form 

let currentForm = document.getElementById('currentPositionForm');

currentForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('location')

    let formData = new FormData();

    //Address
    formData.append('address',currentAddress.value);
    //Country
    formData.append('country',currentCountry.value);
    //County
    formData.append('county',currentCounty.value);
    //Town
    formData.append('town',currentTown.value);
    //Latitude
    formData.append('latitude',currentLatitute.value);
    //Longitude
    formData.append('longitude',currentLongitude.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/institute/currentLocation/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response)

            const successToast = document.getElementById('successToast');
        
            const toast = new bootstrap.Toast(successToast);

            toast.show();

        },
        error: function(error){
            console.log(error)

            document.getElementById('closeCreateHead').click();

            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });



});


//Update with Geo Location location

//1 represent geoCoding

let currentAddress1 = document.getElementById('Address1');
let currentCountry1 = document.getElementById('Country1');
let currentCounty1 = document.getElementById('County1');
let currentTown1 = document.getElementById('Town1');
let currentLatitute1 = document.getElementById('Latitude1');
let currentLongitude1 = document.getElementById('Longitude1');

 
//The button for submit
let submitCurrentActive1 = document.getElementById('submitCurrentActive1');

submitCurrentActive1.addEventListener('click', ()=> {

    //console.log('click');

    document.getElementById('submitCurrent1').click();

});

//The form 

let currentForm1 = document.getElementById('currentPositionForm1');

currentForm1.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('location')

    let formData = new FormData();

    //Address
    formData.append('address',currentAddress1.value);
    //Country
    formData.append('country',currentCountry1.value);
    //County
    formData.append('county',currentCounty1.value);
    //Town
    formData.append('town',currentTown1.value);
    //Latitude
    formData.append('latitude',currentLatitute1.value);
    //Longitude
    formData.append('longitude',currentLongitude1.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/institute/currentLocation/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response)

            const successToast = document.getElementById('successToast');
        
            const toast = new bootstrap.Toast(successToast);

            toast.show();

        },
        error: function(error){
            console.log(error)

            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });



});



//Update with Geo Location location

//1 represent geoCoding

let currentAddress2 = document.getElementById('Address2');
let currentCountry2 = document.getElementById('Country2');
let currentCounty2 = document.getElementById('County2');
let currentTown2 = document.getElementById('Town2');
let currentLatitute2 = document.getElementById('Latitude2');
let currentLongitude2 = document.getElementById('Longitude2');

 
//The button for submit
let submitCurrentActive2 = document.getElementById('submitCurrentActive2');

submitCurrentActive2.addEventListener('click', ()=> {

    //console.log('click');

    document.getElementById('submitCurrent2').click();

});

//The form 

let currentForm2 = document.getElementById('currentPositionForm2');

currentForm2.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('location')

    let formData = new FormData();

    //Address
    formData.append('address',currentAddress2.value);
    //Country
    formData.append('country',currentCountry2.value);
    //County
    formData.append('county',currentCounty2.value);
    //Town
    formData.append('town',currentTown2.value);
    //Latitude
    formData.append('latitude',currentLatitute2.value);
    //Longitude
    formData.append('longitude',currentLongitude2.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/institute/currentLocation/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response)

            const successToast = document.getElementById('successToast');
        
            const toast = new bootstrap.Toast(successToast);

            toast.show();

        },
        error: function(error){
            console.log(error)

            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });



});
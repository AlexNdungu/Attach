$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
    .done(function( script, textStatus ) {
        //window.addEventListener( "load", initMap)

        //window.addEventListener( "load", initMap)
        google.maps.event.addDomListener(window, "load", initAutoComplete)

        getCurrentCompany.addEventListener( "click", initMap);

        checkMapCorrectA.addEventListener( "click", initMapAdv);

    });




//Let us initialise the map api url

//Lets get the company current location button
// let getCurrentCompany = document.getElementById('getCurrentCompany');

//Here we get all the inputs

let Address = document.getElementById('Address');
let Country = document.getElementById('Country');
let County = document.getElementById('County');
let Town = document.getElementById('Town');
let Longitude = document.getElementById('Longitude');
let Latitude = document.getElementById('Latitude');


//This button belongs to advenced

let checkMapCorrectA = document.getElementById('checkMapCorrectA');

//GeoCoding


function initMap(){

     console.log('click');

     navigator.geolocation.getCurrentPosition(
         function (position) {
            initMap2(position.coords.latitude, position.coords.longitude)

            //Here we give lattitude and longitude
            Latitude.value = position.coords.latitude;
            Longitude.value = position.coords.longitude;

         },
         function errorCallback(error) {
            console.log(error)
         }
     );

     function initMap2(lat, lng){

         var myLatLng = {
             lat,
             lng
         };

         var map = new google.maps.Map(document.getElementById('currentMap'), {
             zoom: 7,
             center: myLatLng
         });
         //directionsDisplay.setMap(map);
         //calculateAndDisplayRoute(directionsService, directionsDisplay);
    
         let newIc = document.getElementById('comIconNow').src;
    
         var marker = new google.maps.Marker({
             position: myLatLng,
             map: map,
             optimized: false,
             icon: {url:newIc, scaledSize: new google.maps.Size(20, 20)},
             title: 'Alex'
         });
         //C:\Users\Alex Meta Ndung'u\Documents\Django\Mapi\Static\Images\Logo.jpg
        
         //var marker = new google.maps.Marker({
             //position: myLatLng,
             //map: map,
          //});

         marker.setMap(map);

         //Here we call the geocoder
         const geocoder = new google.maps.Geocoder();

         const infoWindow = new google.maps.InfoWindow();

         geocodeLangLong(geocoder,map,infoWindow);

        

         function geocodeLangLong(geocoder,map,infoWindow){


             geocoder.geocode({location:myLatLng})
             .then((response) => {
                 console.log(response.results)

                 //Adress
                 Address.value = response.results[0].formatted_address

                 for (var i = 0; i < response.results[0].address_components.length; i++) {
                     for (var j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        
                         if (response.results[0].address_components[i].types[j] == "locality") {
                              //$('#id_town').val(place.address_components[i].long_name)   
                              Town.value = response.results[0].address_components[i].long_name;
         
                         }                    
                         if (response.results[0].address_components[i].types[j] == "administrative_area_level_1") {
                             County.value = response.results[0].address_components[i].long_name;
                         }
                         if (response.results[0].address_components[i].types[j] == "country") {
                             Country.value = response.results[0].address_components[i].long_name;
                         }
        
                         //if (response.results[0].address_components[i].types[j] == "postal_code") {
                            // Address.value = response.results[0].address_components[i].long_name;
                         //}
                     }
                 }


             })
    
    
         }


     }

 };


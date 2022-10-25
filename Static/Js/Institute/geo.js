$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    google.maps.event.addDomListener(window, "load", initAutoComplete)
})

let autocomplete;

function initAutoComplete(){
   autocomplete = new google.maps.places.Autocomplete(
       document.getElementById('id-google-address'),
       {
           types: ['address'],
           componentRestrictions: {'country': [base_country.toLowerCase()]},
       })

   autocomplete.addListener('place_changed', onPlaceChanged);
}


function onPlaceChanged (){

    var place = autocomplete.getPlace();

    var geocoder = new google.maps.Geocoder()
    var address = document.getElementById('id-google-address').value

    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            console.log(results)
            //console.log(longitude)


            document.getElementById('id_longitude').innerHTML = longitude;
            document.getElementById('id_latitude').innerHTML = latitude;


            //document.getElementById('id_latitude').value = latitude;

            //-0.3921544567912576, 36.95861735354664

            
        } 
    }); 

    if (!place.geometry){
        document.getElementById('id-google-address').placeholder = "* Begin typing address";
    }
    else{
        
        for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {
                
                if (place.address_components[i].types[j] == "sublocality") {
                     //$('#id_town').val(place.address_components[i].long_name)   
                    document.getElementById('id_town').innerHTML = place.address_components[i].long_name;
 
                }                    
                if (place.address_components[i].types[j] == "administrative_area_level_1") {
                    document.getElementById('id_county').innerHTML = place.address_components[i].long_name;
                }
                if (place.address_components[i].types[j] == "country") {
                    document.getElementById('id_country').innerHTML = place.address_components[i].long_name;
                }

                if (place.address_components[i].types[j] == "postal_code") {
                    document.getElementById('id_post_code').innerHTML = place.address_components[i].long_name;
                }
            }
        }
        
    }
}
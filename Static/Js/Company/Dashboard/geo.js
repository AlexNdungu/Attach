let autocomplete;


function initAutoComplete(){
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('Address1'),
        {
            types: ['address'],
            componentRestrictions: {'country': [base_country.toLowerCase()]},
        })
    
    autocomplete.addListener('place_changed', onPlaceChanged);
}    



function onPlaceChanged (){

    var place = autocomplete.getPlace();

    var geocoder = new google.maps.Geocoder()
    var address = document.getElementById('Address1').value

    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            console.log(results)
            //console.log(longitude)


            document.getElementById('Longitude1').value = longitude;
            document.getElementById('Latitude1').value = latitude;


            //document.getElementById('id_latitude').value = latitude;

            //-0.3921544567912576, 36.95861735354664

            //lets show this coordinates on the map
            var myLatLng = {
                lat : latitude,
                lng : longitude
            };
   
            var map = new google.maps.Map(document.getElementById('geoMap'), {
                zoom: 7,
                center: myLatLng
            });
           
            
            let newIc = document.getElementById('comIconNow').src;
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                optimized: false,
                icon: {url:newIc, scaledSize: new google.maps.Size(20, 20)},
                title: 'Alex'
            });
           
            //var marker = new google.maps.Marker({
                //position: myLatLng,
                //map: map,
             //});
   
            marker.setMap(map);

            
        } 
    }); 

    if (!place.geometry){
        document.getElementById('Address1').placeholder = "* Begin typing address";
    }
    else{
        
        for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {
                
                if (place.address_components[i].types[j] == "locality") {
                     //$('#id_town').val(place.address_components[i].long_name)   
                    document.getElementById('Town1').value = place.address_components[i].long_name;
 
                }                    
                else if (place.address_components[i].types[j] == "administrative_area_level_1") {
                    document.getElementById('County1').value = place.address_components[i].long_name;
                }
                
                else if (place.address_components[i].types[j] == "country") {
                    document.getElementById('Country1').value = place.address_components[i].long_name;
                }
            }
        }
        
    }
}
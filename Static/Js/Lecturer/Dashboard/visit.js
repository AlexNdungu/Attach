//Here we get the script with the map
//Lets get the longitude and latitute of the company the student is at
let longitude = parseFloat(long);
let latitude = parseFloat(lat);

let current_lat;
let current_long;

console.log(longitude)


$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener( "load", initMap)

})


function initMap(){

    //console.log('click');

    navigator.geolocation.getCurrentPosition(
        function (position) {
           initMap2(position.coords.latitude, position.coords.longitude)

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

        var stud_longlat = {
            latitude,
            longitude
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: myLatLng
        });
       
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);

        var marker = new google.maps.Marker({
            position: myLatLng,
            //map: map,
            optimized: false,
            icon: {url:lec_image, scaledSize: new google.maps.Size(20, 20)},
            title: 'Click to zoom'
        });

        var marker1 = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            //map: map,
            optimized: false,
            icon: {url:stud_img, scaledSize: new google.maps.Size(20, 20)},
            title: 'Click to zoom'
        });
        //C:\Users\Alex Meta Ndung'u\Documents\Django\Mapi\Static\Images\Logo.jpg
        
        marker.setMap(map);
        marker1.setMap(map);

    }

};



function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    navigator.geolocation.getCurrentPosition(
        function (position) {
           //initMap2(position.coords.latitude, position.coords.longitude)

           //Here we give lattitude and longitude
            current_lat = position.coords.latitude;
            current_long = position.coords.longitude;

            directionsService.route({
                origin: { lat: current_lat, lng: current_long },
                destination: { lat: latitude, lng: longitude },
                //waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
        
        
            } else {
        
                alert('Directions request failed due to ' + status);
                window.location.assign("/route")
            }
            });

        },
        function errorCallback(error) {
           console.log(error)
        }
    );

}




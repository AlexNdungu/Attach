//Here we get the script with the map

$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener( "load", initMap)

})

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: -1.28333, lng: 36.81667 }
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    //var newIc = document.getElementById('img').src;

    var marker = new google.maps.Marker({
        position: { lat: -1.28333, lng: 36.81667 },
        //map: map,
        optimized: false,
        //icon: {url:newIc, scaledSize: new google.maps.Size(20, 20)},
        title: 'Click to zoom'
    });
    
    marker.setMap(map);

}

const waypts = [
    {location: {lat: -1.218459, lng: 36.886906},
    stopover: true},
    {location: {lat: -1.038757, lng: 37.083375},
    stopover: true}
    ];

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: { lat: -1.28333, lng: 36.81667 },
        destination: { lat: -0.427781, lng: 36.943359 },
        waypoints: waypts,
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
}




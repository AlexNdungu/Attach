//Here we get the script with the map



$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener( "load", initMap)

})

function initMap() {

    //My coordinates
    let my_lat;
    let my_long;

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

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: myLatLng
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


}


//The waypoints
const waypts = []

//Lets get the coordinates
let coods = document.getElementsByClassName('coods');

for(let a = 0; a < coods.length; a++){

    //Latitudes
    //console.log(coods[a].innerHTML.split(",")[0].split("'")[1])
    let lat = parseFloat(coods[a].innerHTML.split(",")[0].split("'")[1])

    //Longitude
    //console.log(coods[a].innerHTML.split(",")[1].split("'")[1])
    let long = parseFloat(coods[a].innerHTML.split(",")[1].split("'")[1])


    //Lets push the waypoints
    waypts.push({location: {lat: lat, lng: long},stopover: true},)
}

// const waypts = [
//     {location: {lat: -1.218459, lng: 36.886906},
//     stopover: true},
//     {location: {lat: -1.038757, lng: 37.083375},
//     stopover: true}
//     ];


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


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
        calculateAndDisplayRoute(directionsService, directionsDisplay,myLatLng);

    }

}


//The waypoints
var waypts = []
const lastCood = []

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
    waypts.push({location: {lat: lat, lng: long},stopover: true})


    //Now lets get the lats item in the loop
    let last_lat = parseFloat(coods[coods.length - 1].innerHTML.split(",")[0].split("'")[1])
    let last_long = parseFloat(coods[coods.length - 1].innerHTML.split(",")[1].split("'")[1])

    lastCood.push({lat: last_lat, lng: last_long})
}


//Remove the last element in way points since it is the 
waypts.pop()


function calculateAndDisplayRoute(directionsService, directionsDisplay, myLatLng) {
    directionsService.route({
        origin: myLatLng,
        destination: lastCood[0],
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


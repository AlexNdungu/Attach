$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
    .done(function( script, textStatus ) {
        //window.addEventListener( "load", initMap)

        //window.addEventListener( "load", initMap)
        google.maps.event.addDomListener(window, "load", initNewMap)

    });

console.log(google_api_key)




//Here we get the coordinates from the front end

let coordinates = document.getElementsByClassName('coordinate');

let new_name = [];

let new_latitudes = [];

let new_longitudes = [];

let new_images = [];

for(let a =0; a < coordinates.length; a++){
    //console.log(coordinates[a].innerHTML)

    let str = coordinates[a].innerHTML;

    //Here we split the name

    let result = str.split(",");

    let result2 = result[0].split("'");

    let names = result2[1];

    //Here we push the name

    new_name.push(names);

    //console.log(result[1])

    //console.log(names)

    //Here we split latitude

    let result3 = result[1].split("'");

    let latitudes = result3[1];

    new_latitudes.push(parseFloat(latitudes));


    //console.log(latitudes)

    //Here we split the longitudes

    //console.log(result[2])

    let result4 = result[2].split("'");

    let longitudes = result4[1];

    //console.log(longitudes)

    new_longitudes.push(parseFloat(longitudes));

    //Parse the url of the images

    let result5 = result[3].split("'");

    let images = result5[1];

    new_images.push(images)

    //console.log(images)



}

//console.log(new_name);
//console.log(new_latitudes);
//console.log(new_longitudes);


function initNewMap(){

    var marker,a;

    var infowindow = new google.maps.InfoWindow();

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: -1.286389, lng: 36.817223 }
    });

    marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
    });   

    for (a = 0; a < new_name.length; a++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(new_latitudes[a], new_longitudes[a]),
            map: map,
            //title: new_name[a]
            optimized: false,
            icon: {url:new_images[a], scaledSize: new google.maps.Size(20, 20)},
        });

        google.maps.event.addListener(marker, 'click', (function (marker, a) {
            return function () {
                map.setZoom(7);
                setTimeout(function(){ 

                    infowindow.setContent(new_name[a]);
                    infowindow.open(map, marker);
                    map.setCenter(marker.getPosition());
                    map.setZoom(8);

                }, 2000);

            }
        })(marker, a));

    }

    //let newIc = document.getElementById('comIconNow').src;
    //var marker = new google.maps.Marker({
        //position: myLatLng,
        //map: map,
        //optimized: false,
        //icon: {url:newIc, scaledSize: new google.maps.Size(20, 20)},
        //title: 'Alex'
    //});



}

// var markers = [];
// for (var i = 0; i < data.length; i++) {
//     var pos = new google.maps.LatLng(data[i].latitud, data[i].longitud);

//     markers[i] = new google.maps.Marker({
//         position: pos,
//         map: map,
//         icon: 'images/locred.png',
//         description: data[i].desc,
//         id: i
//     });

//     var infowindow = new google.maps.InfoWindow({
//         content: data[i].name
//     });

//     infowindow.open(map, markers[i]);
//     google.maps.event.addListener(markers[i], 'click', function () {
//         alert(markers[this.id].description)
//     })
// }

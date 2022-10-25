//Take coordinates


function initMapAdv(){

    let latitude = parseFloat(document.getElementById('Latitude2').value);
    let longitude = parseFloat(document.getElementById('Longitude2').value)

    var myLatLng = {
        lat : latitude,
        lng : longitude
    };

    var map = new google.maps.Map(document.getElementById('advancedMap'), {
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

    marker.setMap(map);

    //-0.3920257137756346, 36.95866026889067

}
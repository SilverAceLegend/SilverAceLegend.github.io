var map;
      function initMap() {
        var input = document.getElementById("home");
        var autocomplete = new google.maps.places.Autocomplete(input);
        document.getElementById("homebutton").addEventListener("click",sethome);
      };

      function sethome() {
        var home = document.getElementById("home").value;
        var geocoder = new google.maps.Geocoder();
        if (home == "") {
          alert("No location selected!");
        } else {
          geocodeAddress(geocoder);

        }
      };

      function geocodeAddress(geocoder) {
        var address = document.getElementById("home").value;
      geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        var baselatlong =(results[0].geometry.location);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15
        });
        map.setCenter(results[0].geometry.location);
        searchplaces(results[0].geometry.location);
      } else {
      alert('Geocode was not successful for the following reason: ' + status);
      }
      })};



var markers = [];
var labels="123456789";
var labelindex = 0;

function hidemarkers(marker) {
  for (i=0; i<marker.length; i++) {
    markers[i].setMap(null);}
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  console.log(places.length);
  for (var i = 1; i < 6; i++) {
    var place = places[i];
    var icon = {
      url: place.icon,
      size: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    // Create a marker for each place.
    var marker = new google.maps.Marker({
      map: map,
      title: place.name,
      position: place.geometry.location,
      id: place.id,
      label: labels[labelindex++]
    });
    // If a marker is clicked, do a place details search on it in the next function.
    marker.addListener('click', function() {
    getPlacesDetails(this, place);
    });
    markers.push(marker);

  }
  labelindex=0;

}

function searchplaces(base) {
  hidemarkers(markers);
  var bounds = map.getBounds();
  var places = new google.maps.places.PlacesService(map);
  places.nearbySearch({
    location: base,
    radius: 1000,
    keyword: ''
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarkers(results);
      if (places.length < 5) {
        window.alert("Less than five points of interest found");
      }
    }});
};

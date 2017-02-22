var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});
  autocomplete.addListener('place_changed', fillInAddress);
}

// [START region_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(place);

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }
  $("#latitude").val(place.geometry.location.lat())
  $("#longitude").val(place.geometry.location.lng())

  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: "/api",
    success: function(users) {
      var users = users
      let markers = [];

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 41.375287, lng: 2.1468333}
        // center is a start-point for geolocate : Plaza España Barcelona
      });
      var infoWindow = new google.maps.InfoWindow({map: map});

      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };

           infoWindow.setPosition(pos);
           infoWindow.setContent('You are here');
           map.setCenter(pos);
         }, function() {
           handleLocationError(true, infoWindow, map.getCenter());
         });
       } else {
         handleLocationError(false, infoWindow, map.getCenter());
       }

      users.forEach(function(user){
        let title = user.username;
        let position = {
          lat: user.location.coordinates[1],
          lng: user.location.coordinates[0]
        };
        // if search -> icon red, if offer -> icon green 'http://labs.google.com/ridefinder/images/mm_20_green.png'
        let icon = 'http://labs.google.com/ridefinder/images/mm_20_red.png'
        console.log(position);

        var pin = new google.maps.Marker({ position, map, title, icon });
        markers.push(pin)
      });
    },
    error: function(err){
      console.log(err);
    }
  });
});

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

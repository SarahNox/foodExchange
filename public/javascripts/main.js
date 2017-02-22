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
      const sol = {
        lat: 41.3977351, lng: 2.1903
      };

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: sol
      });

      users.forEach(function(user){
        let title = user.username;
        let position = {
          lat: user.location.coordinates[1],
          lng: user.location.coordinates[0]
        };
        console.log(position);

        var pin = new google.maps.Marker({ position, map, title  });
        markers.push(pin)
      });
    },
    error: function(err){
      console.log(err);
    }
  });
});

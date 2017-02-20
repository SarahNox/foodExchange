// $(document).ready(function(){
//
// 	$.ajax({
// 		url: "http://localhost:3000/api/places",
// 		method: "GET",
// 		success: function(result) {
// 			var myPlaces = result;
// 			let markers = [];
//
// 			const sol = {
// 		    lat: 41.3977351, lng: 2.1903
// 		  };
//
// 			const map = new google.maps.Map(document.getElementById('map'), {
// 		    zoom: 15,
// 		    center: sol
// 			});
//
// 			// let markers = [];
// 		  myPlaces.forEach(function(place){
// 		    let title = place.name;
// 		    let position = {
// 		      lat: place.location.coordinates[1],
// 		      lng: place.location.coordinates[0]
// 		    };
// 				// console.log(position);
// 		    var pin = new google.maps.Marker({ position, map, title  });
// 		    markers.push(pin)
// 		  });
// 		},
// 		error: function(err){
// 			console.log(err);
// 		}
// 	})
// });

function startMap() {

  // Store Ironhack's coordinates
  var sol = { lat: 41.40,  lng: 2.190471916 };

  // Map initialization
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
  });

  // Add a marker for Ironhack Barcelona
  var Marker = new google.maps.Marker({
    position: {
      lat: sol.lat,
      lng: sol.lng
    },
    map: map,
    title: "Ironhack Office",
		icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      var Marker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here",
				icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

startMap();

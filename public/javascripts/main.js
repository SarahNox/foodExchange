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
          lat: 41.3977351,
          // user.location.coordinates[1],
          lng: 2.1903
          // user.location.coordinates[0]
        };

        var pin = new google.maps.Marker({ position, map, title  });
        markers.push(pin)
      });
    },
    error: function(err){
      console.log(err);
    }
  });
});

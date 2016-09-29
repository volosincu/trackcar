
$(document).ready(function(){

	//refresh data after a minute 
	setInterval(function(){
		window.location = "http://localhost:3000";
	}, 60000);

        distance = parseInt(getDistanceFromLatLonInKm(coords.a.lat, coords.a.lon, coords.b.lat, coords.b.lon));

        $('#km').html(distance);
        console.log(distance);
        
	if (distance < 5){
		$('#sign').addClass("closer");
	}
	if (distance < 10 && distance > 5){
		$('#sign').addClass("close");
	}
	if (distance > 15){
		$('#sign').addClass("farer");
	}
	if (distance < 15 && distance > 10){
		$('#sign').addClass("far");
	}
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
}

function deg2rad(deg) {
  	return deg * (Math.PI/180)
}

	

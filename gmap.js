 var map, distance ,coords = {
	a : { lat : '50.3643022', lon : '8.695015', title : 'Destination: Daimlerstraße 61239 Ober-Mörlen' },
	b : { lat : $("#lat").val(), lon : $("#lon").val(), title : "Vehicle position" }
};


function initialize() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 9,
	  center: new google.maps.LatLng($("#lat").val(),$("#lon").val()),
	  mapTypeId: 'terrain'
	});

	var script = document.createElement('script');
	script.src = 'https://developers.google.com/maps/documentation/javascript/tutorials/js/earthquake_GeoJSONP.js';
	document.getElementsByTagName('head')[0].appendChild(script);
};

var setPoint = function(r){

	var latLng = new google.maps.LatLng(r.lat, r.lon);
	var marker = new google.maps.Marker({
	    position: latLng,
	    map: map,
	    title : r.title
	});
};


// load points of vehicle and location
window.eqfeed_callback = function(results) {
	setPoint(coords.a);
	setPoint(coords.b);
}

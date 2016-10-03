
var map, distance ,coords = {
    o : { lat : $('#hlat').val(), lon : $('#hlon').val(), title : "Party Rent Frankfurt"}
};

function initialize() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 7,
	  center: new google.maps.LatLng(coords.o.lat, coords.o.lon),
	  mapTypeId: 'terrain'
	});

	var script = document.createElement('script');
	script.src = 'https://developers.google.com/maps/documentation/javascript/tutorials/js/earthquake_GeoJSONP.js';
	document.getElementsByTagName('head')[0].appendChild(script);
};

var setPoint = function(latLng, coord, info){

    if(info != null) {
	$("#"+coord.title+"-duration").text(info.duration);
	$("#"+coord.title+"-distance").text(info.distance);
	setColor(info.distance, coord.title);
    }
    var marker = new google.maps.Marker({
	position: latLng,
	map: map,
	title : coord.title
    });
};

window.eqfeed_callback = function(results) {

    Array.prototype.slice.apply($('.list-group-item')).forEach(function(el){
	coords[el.id] = {
	    title : el.id,
	    vehsign : el.id,
	    lat : $('#'+el.id+"-lat").val(),
	    lon : $('#'+el.id+"-lon").val()
	};
    });
    loadDistances(coords);
}

//////// utils functions /////////

function loadDistances(coords) {

    let dest = [], skip = true, titles = [];
    for(let v in coords){
	if(!skip){
	    dest.push(new google.maps.LatLng(coords[v].lat, coords[v].lon));
	    titles.push(coords[v]);
	}
	skip = false;
    }

    let origin = new google.maps.LatLng(coords.o.lat, coords.o.lon);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
	{
	    origins: [ origin ],
	    destinations: dest,
	    travelMode: 'DRIVING'
	},  function ( response, status) {

	    if (status == 'OK') {

		var origins = response.originAddresses;
		var destinations = response.destinationAddresses;

		setPoint(origin, coords.o);
		for (var i = 0; i < origins.length; i++) {
		    var results = response.rows[i].elements;
		    for (var j = 0; j < results.length; j++) {
			var element = results[j];
			var info = {
			    distance : element.distance.text,
			    duration : element.duration.text
			}
			setPoint(dest[j], titles[j], info);
		    }
		}
		orderByDistance();
	    }
	});

}


/**
 * @description set color depending on distance to origin
 */
function setColor(distance, id) {

    distance = parseFloat(distance);
    if (distance < 10){
	$("#"+id+"-sg").addClass("closer");
    }
    if (distance > 15){
	$("#"+id+"-sg").addClass("far");
    }
    if (distance < 15 && distance > 10){
	$("#"+id+"-sg").addClass("close");
    }
}

/**
 * @description detach elements from dom, sort by distance and reappend them
 */
function orderByDistance(){
    var lis = Array.prototype.slice.apply($('.list-group-item').detach());

    lis.sort(function(a, b){
	const aa = parseFloat($(a).find("#"+a.id+"-distance").text().replace(/km/g, ""));
	const bb = parseFloat($(b).find("#"+b.id+"-distance").text().replace(/km/g, ""));

	if(aa== bb) return 0;
	return aa> bb? 1: -1;
    });
    $('#veh-list').append(lis);
};

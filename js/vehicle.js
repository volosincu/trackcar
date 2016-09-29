
var q = require('q');
var ejs = require('ejs');
var http = require('http');

module.exports = {
    
    requestVehData : function(vid, cid) {
	var deffer = q.defer();
	
	var url = 'http://map.yellowfox.de/rti/get_pos.php?company='
	    + cid +'&vehicle='+ vid +'&format=JSON';
	
	var rst = http.get(url, function(httpres){
	    var data = "";
	    httpres.on("data", function (chunk) {
		data += chunk;
	    });
	    httpres.on("end", function () {
		var d = JSON.parse(data);
		deffer.resolve(d[0]);
	    });
	});
	
	rst.end();
	return deffer.promise;
    },
       
    requestVehName : function(vid, cid) {
	var deffer = q.defer();
	
	var url = 'http://map.yellowfox.de/rti/get_cars.php?company='
	    + cid +'&vehicle='+ vid;
	
	var rst = http.get(url, function(httpres){
	    var data = "";
	    httpres.on("data", function (chunk) {
		data += chunk;
	    });
	    httpres.on("end", function () {
		deffer.resolve(data.split(';'));
	    });
	});
	
	rst.end();
	return deffer.promise;
    }    
}

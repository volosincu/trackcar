"use strict";

const q = require('q');
const http = require('http');
const https = require('https');

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
    }


}

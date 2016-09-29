

var express = require('express')

var q = require('q');
var ejs = require('ejs');
var http = require('http');
var path = require('path');



var app = express();
app.use(express.static('js'));
app.use(express.static('lib'));
app.use(express.static('css'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


var vehId = "4BA39CF7BB574E7600DA96D7FD12CD5A";
var comId = "E02CC441D5DFB320DE6354B6C23F31B1";


app.get('/', function (req, res) {    
    requestVehData(vehId, comId).then(function(data){
	requestVehName(vehId, comId).then(function(veh){
	    data.name = veh[0].split("\"")[1];
	    res.render('index', data);
	});
    });
})

app.listen(3000, function () {console.log('Example app listening on port 3000!')})



function requestVehData(vid, cid) {
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



function requestVehName(vid, cid) {
    var deffer = q.defer();

    var url = 'http://map.yellowfox.de/rti/get_cars.php?company='
	+ cid +'&vehicle='+ vid +'&format=JSON';

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

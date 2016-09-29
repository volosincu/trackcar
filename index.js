

var path = require('path');
var express = require('express')

var vehicle = require('./js/vehicle');

var app = express();
app.use(express.static('js'));
app.use(express.static('lib'));
app.use(express.static('css'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

var vehId = "4BA39CF7BB574E7600DA96D7FD12CD5A";
var comId = "E02CC441D5DFB320DE6354B6C23F31B1";

app.get('/', function (req, res) {    
    vehicle.requestVehData(vehId, comId).then(function(data){
	console.log(data);
	vehicle.requestVehName(vehId, comId).then(function(veh){
	    data.name = veh[0].split("\"")[1];
	    res.render('index', data);
	});
    });
})

app.listen(3000, function () {console.log('Application started on http://localhost:3000')})




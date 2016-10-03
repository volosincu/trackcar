"use strict";

const q = require('q');
const path = require('path');
const express = require('express')
const url = require('url');


var vehicle = require('./js/vehicle');

var app = express();
app.use(express.static('js'));
app.use(express.static('lib'));
app.use(express.static('css'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.set('view options', {
    open: '{{',
    close: '}}'
});


var vehIds = ["4BA39CF7BB574E7600DA96D7FD12CD5A",
	      "208C87FF45E93A4DFF68D9B096297CEA",
	      "50857D399C2035649858039B668FD1A4",
	      "73C859FDAAC7F2B33D63B26193C90ABE",
	      "21A608B084CCEB49595450254FC412D2",
	      "00F61D8EE2351A723F0921B4EB75B9AF",
	      "43705686FC112A08A3EDD78BEEF3EB04",
	      "357E3F69247BDA827E326BEB73439D5D",
	      "57889E23F5E25AF377803334A07A78D5",
	      "572CBC6DC9CFF4712519585B49351E07",
	      "EBB06EB8F737D16994DCE23921C01666",
	      "339889F3733612411C6FDBF0C54ED51F",
	      "94EE6F8F561CACD625932D7DCD658835",
	      "24B5804F3900DFD5296A34EEE0798A39",
	      "D51575F2AFB6ED90562741F233E6A162"
	     ];

var comId = "E02CC441D5DFB320DE6354B6C23F31B1";

app.get('/', function (req, res) {

    let originlat = "50.3643022", originlon = "8.695015";

    if(req.query.lat != null) {
	originlat = req.query.lat;
    }

    if(req.query.lon != null) {
	originlon = req.query.lon;
    }

    let promises = [], vehs = [];
    for (let k in vehIds){
	let vehId = vehIds[k];
	promises.push(vehicle.requestVehData(vehId, comId));
    }

    q.allSettled(promises)
	.then(function (results) {
	    let y = 0;
	    results.forEach(function (result) {
		if (result.state === "fulfilled") {
		    y++;
		    const vh = result.value;
		    vh.idv = vh.vehsign.replace(/\s/g, '')
		    vehs.push(vh);
		    if(y == vehIds.length){
			let data = {};
			data.originlat = originlat;
			data.originlon = originlon;

			res.render('index', {data : data, vehs : vehs, uidata : {}});
		    }
		} else {
		    var reason = result.reason;
		    console.log(reason);
		}
	    });
	});

})

app.listen(3000, function () {console.log('Application started on http://localhost:3000')})

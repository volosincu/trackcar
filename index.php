
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Apache2 Debian Default Page: It works</title>
    <style type="text/css" media="screen">
  * {
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
  }

  body, html {
    padding: 3px 3px 3px 3px;

    background-color: #D8DBE2;

    font-family: Verdana, sans-serif;
    font-size: 11pt;
    text-align: center;
  }

  div.main_page {
    position: relative;
    display: table;

    width: 800px;

    margin-bottom: 3px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 0px 0px 0px;

    border-width: 2px;
    border-color: #212738;
    border-style: solid;

    background-color: #FFFFFF;

    text-align: center;
  }

  div.page_header {
    height: 99px;
    width: 100%;

    background-color: #F5F6F7;
  }

  div.page_header span {
    margin: 15px 0px 0px 50px;

    font-size: 180%;
    font-weight: bold;
  }

   #map {
        height: 500px;
        width: 100%;
       }


    </style>
  </head>
  <body>
    <div class="main_page">
      <div class="page_header floating_element">
       
      </div>

      <div class="content_section floating_element">

	<?php
		$urlBase = "http://map.yellowfox.de/rti/get_pos.php";
		$vehId = "4BA39CF7BB574E7600DA96D7FD12CD5A";
		$comId = "E02CC441D5DFB320DE6354B6C23F31B1";

		$url = "$urlBase?company=$comId&vehicle=$vehId&format=XML";  
		$ch = curl_init();  

		curl_setopt($ch, CURLOPT_URL, $url);  
		curl_setopt($ch, CURLOPT_HEADER, 0);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
		curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type: text/xml')); 

		$output = curl_exec($ch);
		curl_close($ch);  
		echo $output;
		$xml = simplexml_load_string($output);
		$json = json_encode($xml, JSON_PRETTY_PRINT);
		$response = json_decode($json, true);
	
		$lat = $response["message"]["lat"];
		$lon = $response["message"]["lon"];

	?>
 
      </div>

	<input type="hidden" name="lat" id="lat" value="<?php echo $lat; ?>"/>
	<input type="hidden" name="lon" id="lon" value="<?php echo $lon; ?>"/>

      </div>
    </div>
  <div id="map"></div>

<script src="lib/jquery.js"></script>


   <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNUHy1uN_5F07POiMQBtGXcjSEeCixZb4&callback=initialize">
    </script>

 <script>

	      var map;

	      function initialize() {
			map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 16,
			  center: new google.maps.LatLng($("#lat").val(),$("#lon").val()),
			  mapTypeId: 'terrain'
			});
	
			var script = document.createElement('script');
			script.src = 'https://developers.google.com/maps/documentation/javascript/tutorials/js/earthquake_GeoJSONP.js';
			document.getElementsByTagName('head')[0].appendChild(script);
	      	};

		var pos = { lat : '50.3643022', lon : '8.695015', title : 'Destination: Daimlerstraße 61239 Ober-Mörlen' };
		var veh = { lat : $("#lat").val(), lon : $("#lon").val(), title : "Vehicle position" };
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
			setPoint(pos);
			setPoint(veh);
	      	}


	

      
 
    </script>



  
  </body>
</html>


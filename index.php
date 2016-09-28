
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title> Vehicle position </title>
	<link rel="stylesheet" type="text/css" href="style.css"  media="screen">
  </head>

         <?php
		$urlBase = "http://map.yellowfox.de/rti/get_pos.php";
		$urlVBase = "http://map.yellowfox.de/rti/get_cars.php";
		$vehId = "4BA39CF7BB574E7600DA96D7FD12CD5A";
		$comId = "E02CC441D5DFB320DE6354B6C23F31B1";

		function getData ($url){
			
			$ch = curl_init();  

			curl_setopt($ch, CURLOPT_URL, $url);  
			curl_setopt($ch, CURLOPT_HEADER, 0);  
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
			curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type: text/xml')); 

			$output = curl_exec($ch);
			curl_close($ch);  

			return $output;
		}

		$url = "$urlBase?company=$comId&vehicle=$vehId&format=XML";  
		$positionXML = getData($url);

		$xml = simplexml_load_string($positionXML);
		$json = json_encode($xml, JSON_PRETTY_PRINT);
		$position = json_decode($json, true);

		$urlVeh = "$urlVBase?company=$comId&vehicle=$vehId";  
		$car = getData($urlVeh);

		$myCar = explode(';', $car);
		
	?>

  <body>
    	<div class="main_page">
	      <div class="page_header floating_element">
		<div class="name">
	       	 <h3 style="display: inline-block;">Vehicle :</h3><span style="display: inline-block;"> <?php echo  substr($myCar[0], 1, -1);  ?> </span>
		</div>	
		<div class="dist"> 
			<div class="sg" id="sign"></div>
		</div>
	      </div>
		<input type="hidden" name="lat" id="lat" value="<?php echo $position["message"]["lat"]; ?>"/>
		<input type="hidden" name="lon" id="lon" value="<?php echo $position["message"]["lon"]; ?>"/>

	      </div>
	    </div>
  	<div id="map"></div>

	<script src="lib/jquery.js"></script>
   	<script async defer
        	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNUHy1uN_5F07POiMQBtGXcjSEeCixZb4&callback=initialize">
    	</script>

	<script src="main.js"></script>
	<script src="gmap.js"></script>

  </body>
</html>


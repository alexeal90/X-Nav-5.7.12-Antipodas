
function compatible(elem, text){
	writeElement = document.getElementById(elem);
	writeElement.innerHTML = text;
}

if (Modernizr.geolocation){
	compatible("geo", "Compatible con geolocalizacion.")
	var options = {
	enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		console.log('Your current position is:');
		console.log('Latitude : ' + crd.latitude);
		console.log('Longitude: ' + crd.longitude);
		console.log('More or less ' + crd.accuracy + ' meters.');
		compatible("lat_dec_user", crd.latitude);
		compatible("lon_dec_user", crd.longitude)

		var mapDivUser = document.getElementById("mapUsr");
		var mapUsr = new google.maps.Map(mapDivUser, {
			center: {lat: crd.latitude, lng: crd.longitude},
			zoom: 18
		});

		var infowindow = new google.maps.InfoWindow();
		var marker;

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(crd.latitude, crd.longitude),
			map: mapUsr
		});

		infowindow.setContent("Esta es tu posicion actual");
		infowindow.open(mapUsr, marker);
	};

	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	function initMap(){
		var mapDiv = document.getElementById("map");
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 44.540, lng: -78.546},
			zoom: 8
		});

		navigator.geolocation.getCurrentPosition(success, error, options);
	}
}else{
	compatible("geo", "NO compatible con geolocalizacion.")
}

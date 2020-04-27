//Receives ArcGIS Server features. Inserts distance, sorts smallest to largest distance, and slices down to 20 records. Records are then returned as simplified object.
function calculateDistanceSortSlice(body,foundLat,foundLng){
	var valueList = [];
	var maxNumberOfReturns = 20;
	for (i = 0; i < body.features.length; i++) {
		valueList.push({
			SiteName:fixIfNull(body.features[i].attributes.SITENAME),
			SiteAddress:fixIfNull(body.features[i].attributes.SITEADDRESS),
			SiteType:fixIfNull(body.features[i].attributes.SITETYPE),
			SiteStatus:fixIfNull(body.features[i].attributes.SITESTATUS),
			OpenDays:fixIfNull(body.features[i].attributes.OPENDAYS),
			OpenTimes:fixIfNull(body.features[i].attributes.OPENTIMES),
			OpenDates:fixIfNull(body.features[i].attributes.OPENDATES),
			MealTypes:fixIfNull(body.features[i].attributes.MEALTYPES),
			Description:fixIfNull(body.features[i].attributes.DESCRIPTION),
			DescriptionLong:fixIfNull(body.features[i].attributes.DESCRIPTIONLONG),
			PhoneNumber:fixIfNull(body.features[i].attributes.PHONENUMBER),
			Email:fixIfNull(body.features[i].attributes.EMAIL),
			WebLink:fixIfNull(body.features[i].attributes.WEBLINK),
			CityName:fixIfNull(body.features[i].attributes.CITYNAME),
			CityCouncilDistrict:fixIfNull(body.features[i].attributes.CITYCOUNCILDISTRICT),
			LastUpdated:convertUnixTime(fixIfNull(body.features[i].attributes.LASTUPDATE)),
			EditorNotes:fixIfNull(body.features[i].attributes.NOTES),
			Lat:body.features[i].geometry.y.toFixed(6),
			Lng:body.features[i].geometry.x.toFixed(6),
			Distance:calculateDistance(foundLat, foundLng, body.features[i].geometry.y, body.features[i].geometry.x).toFixed(2)
		})
	}
	valueList.sort(function (a, b) {return a.Distance.localeCompare(b.Distance);});//sort on distance
	valueList = valueList.slice(0, maxNumberOfReturns); //keep only N nearest records
	return valueList;
}


//Processes radio button value of selected
function getWithinMetersFromRadio(){
	var radios = document.getElementsByTagName('input');
	var value;
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].type === 'radio' && radios[i].checked) {
			// get value, set checked flag or do whatever you need to
			value = radios[i].value;       
		}
	}
	return value;
}


//Processes radio button changes
function onChangeOfRadio(){
	if(document.getElementById('addressSearch').value == ""){
		//do nothing
	}
	else{
		searchForThisAddress(document.getElementById('addressSearch').value, null);
	}
}


//Generic useful functions
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	//https://www.geodatasource.com/developers/javascript
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		//miles is default
		if (unit=="K") { dist = dist * 1.609344 }//kilometers
		if (unit=="N") { dist = dist * 0.8684 }//nautical miles
		return dist;
	}
}


function fixIfNull(value){
	if(value == null){
		value = "None";
	}
	else if(value == ""){
		value = "None";
	}
	return value;
}


function toTitleCase(str){//makes a string become proper case
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


function convertUnixTime(unix_timestamp){
	//let unix_timestamp = 1549312452
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	//var date = new Date(unix_timestamp * 1000);
	var date = new Date(unix_timestamp);
	
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();
	
	var fullyear = date.getFullYear();
	var month = parseInt(date.getMonth())+1;//month starts at 0.
	var day = date.getDate();

	// Will display time in 10:30:23 format
	var formattedTime = fullyear + "/" + month + "/" + day + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	return(formattedTime);	
}
function loadAccordionMain() {
  //main accordion HTML frame that will be injected after user types address. Each span with an ID in this will have further innerHTML injected into it after API callout resolves.
  document.getElementById("accordionMain").innerHTML =
    '<!-- Output for Seniors -->\
  <div class="topLvlAccItem">\
    <div class="topLvlLabel" id="seniorLabel">\
        <img class="menu-icon" src="assets/img/icons/icon_senior_white.png" />\
        <img class="menu-arrow" src="assets/img/icons/icon_white_arrow.png" />\
        <span class="label-text" id="labelSeniors">Group 1</span>\
    </div>\
    <div class="topLvlResults" id="dataSeniors"></div>\
  </div>\
  <!-- Output for Kids -->\
  <div class="topLvlAccItem">\
    <div class="topLvlLabel" id="schoolLabel">\
        <img class="menu-icon" src="assets/img/icons/icon_school_white.png" />\
        <img class="menu-arrow" src="assets/img/icons/icon_white_arrow.png" />\
        <span class="label-text" id="labelSchools">Group 2</span>\
    </div>\
    <div class="topLvlResults" id="dataSchools"></div>\
  </div>\
  <!-- Output for All Ages -->\
  <div class="topLvlAccItem">\
    <div class="topLvlLabel" id="communityLabel">\
        <img class="menu-icon" src="assets/img/icons/icon_community_white.png" />\
        <img class="menu-arrow" src="assets/img/icons/icon_white_arrow.png" />\
        <span class="label-text" id="labelCommunity">Group 3</span>\
    </div>\
    <div class="topLvlResults" id="dataCommunity"></div>\
  </div>\
  <!-- Output for Groceries Low Income -->\
  <div class="topLvlAccItem">\
    <div class="topLvlLabel" id="foodBankLabel">\
        <img class="menu-icon" src="assets/img/icons/icon_grocery_white.png" />\
        <img class="menu-arrow" src="assets/img/icons/icon_white_arrow.png" />\
        <span class="label-text" id="labelFoodBanks">Group 4</span>\
    </div>\
    <div class="topLvlResults" id="dataFoodBanks"></div>\
  </div>\
  ';
}

function doSomethingWithSelectedAddress(foundLat, foundLng, foundAddress) {
  //Put the actions to do with found address here
  callApiAndBuildJson(foundLat, foundLng, foundAddress);
}

////GET FROM ARCGIS SERVER REST ENDPOINTS////
function callApiAndBuildJson(foundLat, foundLng, userAddress) {
  loadAccordionMain(); //load framework to main

  var withinMeters = getWithinMetersFromRadio();

  //SENIORS
  var request = new XMLHttpRequest();
  var whereStatement = "SITESTATUS <> 'Closed'";
  request.open(
    "GET",
    "https://geo.sanjoseca.gov/server/rest/services/EOC/EOC_COVID19_SantaClaraCountyFoodAccess/MapServer/1/query?where=" +
      whereStatement +
      "&objectIds=&time=&geometry=" +
      foundLng +
      "%2C" +
      foundLat +
      "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=" +
      withinMeters +
      "&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=",
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    populateAccordion(
      data,
      userAddress,
      foundLat,
      foundLng,
      "labelSeniors",
      "dataSeniors",
      "Free Senior Meals"
    );
  };
  // Send request
  request.send();

  //SCHOOLS
  var request = new XMLHttpRequest();
  var whereStatement = "SITESTATUS <> 'Closed'";
  request.open(
    "GET",
    "https://geo.sanjoseca.gov/server/rest/services/EOC/EOC_COVID19_SantaClaraCountyFoodAccess/MapServer/2/query?where=" +
      whereStatement +
      "&objectIds=&time=&geometry=" +
      foundLng +
      "%2C" +
      foundLat +
      "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=" +
      withinMeters +
      "&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=",
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    populateAccordion(
      data,
      userAddress,
      foundLat,
      foundLng,
      "labelSchools",
      "dataSchools",
      "Free School Meals"
    );
  };
  // Send request
  request.send();

  //COMMUNITY
  var request = new XMLHttpRequest();
  var whereStatement = "SITESTATUS <> 'Closed'";
  request.open(
    "GET",
    "https://geo.sanjoseca.gov/server/rest/services/EOC/EOC_COVID19_SantaClaraCountyFoodAccess/MapServer/6/query?where=" +
      whereStatement +
      "&objectIds=&time=&geometry=" +
      foundLng +
      "%2C" +
      foundLat +
      "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=" +
      withinMeters +
      "&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=",
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    populateAccordion(
      data,
      userAddress,
      foundLat,
      foundLng,
      "labelCommunity",
      "dataCommunity",
      "Free Community Meals"
    );
  };
  // Send request
  request.send();

  //FOODBANKS
  var request = new XMLHttpRequest();
  var whereStatement = "SITESTATUS <> 'Closed'";
  request.open(
    "GET",
    "https://geo.sanjoseca.gov/server/rest/services/EOC/EOC_COVID19_SantaClaraCountyFoodAccess/MapServer/3/query?where=" +
      whereStatement +
      "&objectIds=&time=&geometry=" +
      foundLng +
      "%2C" +
      foundLat +
      "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=" +
      withinMeters +
      "&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=",
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    populateAccordion(
      data,
      userAddress,
      foundLat,
      foundLng,
      "labelFoodBanks",
      "dataFoodBanks",
      "Free Grocery Programs"
    );
  };
  // Send request
  request.send();
}

function populateAccordion(
  data,
  userAddress,
  foundLat,
  foundLng,
  labelType,
  dataType,
  nameType
) {
  //distance, sort, slice
  data = calculateDistanceSortSlice(data, foundLat, foundLng);

  var injectionHtml = "";
  if (data.length == 0) {
    var injectionHeadingHtml =
      nameType + " <span class='textNone'>(None Nearby)</span>";
  } else {
    for (i = 0; i < data.length; i++) {
      //Fills out each accordion span with innerHTML and injects it.
      injectionHtml += `\
        <div class="location-row">
            <img class="menu-arrow" src="assets/img/icons/icon_arrow_teal.png" />\
            <span class="location-label">${data[i].SiteName}</span>
            <span class="location-distance"> (${data[i].Distance} miles)</span>\
        </div>
        <div class="location-details">\
            <div>
            <span class="detail-label">Location name:</span>
            <span class="detail-output">${data[i].SiteName}</span>
            </div>
            <div>
            <span class="detail-label">About:</span>
            <span class="detail-output">${data[i].SiteAddress}</span>
            </div>
            <div>
            <span class="detail-label">More Details:</span>
            <span class="detail-output">${data[i].Description}</span>
            </div>
            <div>
            <span class="detail-label">Phone number:</span>
            <span class="detail-output">${data[i].PhoneNumber}</span>
            </div>
            <div>
            <span class="detail-label">Website:</span>
            <span class="detail-output">${checkWebLink(data[i].WebLink)}</span>
            </div>
            <div>
            <span class="detail-label">Program address:</span>
            <span class="detail-output">
           
            <a href="https://www.google.com/maps/dir/${userAddress}/${
        data[i].SiteAddress
      }" target="_blank" rel="noopener noreferrer">Google Maps</a>
            </span>
            </div>
            <div>
            <span class="detail-label">Days open:</span>
            <span class="detail-output">${data[i].OpenDays}</span>
            </div>
            <div>
            <span class="detail-label">Hours open:</span>
            <span class="detail-output">${data[i].OpenTimes}</span>
            </div>
            <div>
            <span class="detail-ftnote-label">Dates in operation:</span>
            <span class="detail-ftnote-output">${data[i].OpenDates}</span>
            <span class="detail-ftnote-label">Location type:</span>
            <span class="detail-ftnote-output">${data[i].SiteType}</span>
            <span class="detail-ftnote-label">Last updated:</span>
            <span class="detail-ftnote-output">${data[i].LastUpdated}</span>
            </div>
        </div>\
      `;
    }
    var injectionHeadingHtml = nameType + " (" + data.length + ")";
  }
  document.getElementById(labelType).innerHTML = injectionHeadingHtml;
  document.getElementById(dataType).innerHTML = injectionHtml;
}

function checkWebLink(link) {
  if (link.length > 10) {
    //I assume a length will be pretty long, and N/A, None, or "" is shorter than 10.
    var newLink = '<a href="' + link + '" target="_blank">Website</a>';
  } else {
    var newLink = "None";
  }
  return newLink;
}

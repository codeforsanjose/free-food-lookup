//////////////////ADDRESS SUGGESTIONS//////////////////
function getSearchSuggestions(userTypedAddress) {
  if (userTypedAddress.length > 3) {
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open(
      "GET",
      "https://geo.sanjoseca.gov/server/rest/services/Locators/EOC_CountyLocator/GeocodeServer/suggest?text=" +
        userTypedAddress +
        "&maxSuggestions=&category=&countryCode=&searchExtent=&location=&distance=&f=pjson",
      true
    );

    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      console.log(data);
      var insertSuggestions = "";
      for (i = 0; i < data.suggestions.length; i++) {
        insertSuggestions +=
          "<div class='selectSuggestion' onclick='searchForThisAddress(null, this.id)' id='" +
          data.suggestions[i].magicKey +
          "'>" +
          removeZipCode(data.suggestions[i].text) +
          "</div>";
      }
      insertSuggestions +=
        "<p><img src='assets/img/logos/logo_county.png' /><b>Powered By</b> Santa Clara County Address Database</p>";
      document.getElementById(
        "addressSearchSuggest"
      ).innerHTML = insertSuggestions;
      document.getElementById("addressSearchSuggest").style.display = "block";
    };

    function removeZipCode(address) {
      address = address.substring(0, address.length - 11);
      return address;
    }

    // Send request
    request.send();
  } else {
    document.getElementById("addressSearchSuggest").style.display = "none";
  }
}

//////////////////SEARCH ADDRESS//////////////////
function searchForThisAddress(typedAddress, magicKey) {
  var request = new XMLHttpRequest();

  if (magicKey != null) {
    //address came from suggestion magic key
    request.open(
      "GET",
      "https://geo.sanjoseca.gov/server/rest/services/Locators/EOC_CountyLocator/GeocodeServer/findAddressCandidates?Address=&Address2=&Address3=&Neighborhood=&City=&Subregion=&Region=&Postal=&PostalExt=&CountryCode=&SingleLine=&outFields=*&maxLocations=&matchOutOfRange=true&langCode=&locationType=&sourceCountry=&category=&location=&distance=&searchExtent=&outSR=4269&magicKey=" +
        magicKey +
        "&f=pjson",
      true
    );
  } else if (typedAddress != null) {
    //address was typed
    request.open(
      "GET",
      "https://geo.sanjoseca.gov/server/rest/services/Locators/EOC_CountyLocator/GeocodeServer/findAddressCandidates?Address=" +
        typedAddress +
        "&Address2=&Address3=&Neighborhood=&City=&Subregion=&Region=&Postal=&PostalExt=&CountryCode=&SingleLine=&outFields=*&maxLocations=&matchOutOfRange=true&langCode=&locationType=&sourceCountry=&category=&location=&distance=&searchExtent=&outSR=4269&magicKey=&f=pjson",
      true
    );
  }

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data);
    var foundAddress = data.candidates[0].address;
    var foundStreet =
      data.candidates[0].attributes.StName +
      "" +
      data.candidates[0].attributes.StType; //don't need a space, its built into TYPE field
    var foundLat = data.candidates[0].location.y;
    var foundLng = data.candidates[0].location.x;
    document.getElementById("addressSearchSuggest").style.display = "none";
    document.getElementById("addressSearch").value = foundAddress;
    callApiAndBuildJson(foundLat, foundLng, foundAddress);
  };

  // Send request
  request.send();
}

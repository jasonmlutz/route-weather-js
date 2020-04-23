const originInputButton = document.getElementById('origin-input-button');
const destinationInputButton = document.getElementById('destination-input-button');

const readEndpointInput = (endpointType) => {
  return document.querySelector(`input[id=${endpointType}]`).value;
}

const setEndpointLog = (endpointType, logString) => {
  document.querySelector(`p[id=${endpointType}]`).textContent = logString;
}

const submitRouteEndpointSearch = (e) => {
  buttonId = e.target.id;
  if (buttonId === 'destination-input-button') {
    endpointType = 'destination';
  }
  if (buttonId === 'origin-input-button') {
    endpointType = 'origin';
  }
  searchString = readEndpointInput(endpointType);
  if (searchString.length === 0) {
    setEndpointLog(endpointType, "Please enter a value!");
    return;
  } else {
    logString = `Searching for ${searchString} ...`
    setEndpointLog(endpointType, logString);
    fetchLocationSearch(searchString)
      .then((response) => {return response.json();})
      .then((data) => {populateSelect(endpointType, data)})
  }

}

originInputButton.onclick = submitRouteEndpointSearch;
destinationInputButton.onclick = submitRouteEndpointSearch;

let geocodingBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const generateGeocodingURL = (searchText) => {
  if (typeof searchText !== "string") {
    console.warn(`searchText {${searchText}} is not of type "string"`);
  } else {
    encodedSearchText = encodeURI(searchText);
    return `${geocodingBaseURL}${encodedSearchText}.json?access_token=${mapBoxToken}`;
  }
}

let navigationBaseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'

const generateNavigationURL = (originCoords, destinationCoords) => {
  return `${navigationBaseURL}${originCoords};${destinationCoords}?steps=true&access_token=${mapBoxToken}`;
}

const fetchLocationSearch = (searchText) => {
  return fetch(generateGeocodingURL(searchText))
}

const fetchNavigation = (originCoords, destinationCoords) => {
  return fetch(generateNavigationURL(originCoords, destinationCoords))
}

const constructLocationObject = (inputFeature) => {
  let outputObject = {
    name: {
      short: inputFeature.text,
      long: inputFeature.place_name
    },
    coords: {
      lat: inputFeature.center[1],
      long: inputFeature.center[0],
      searchString: `${inputFeature.center[0]},${inputFeature.center[1]}`
    },
    id: inputFeature.id,
  };
  return outputObject
}

const buildLocationArray = (mapboxData) => {
  let len = mapboxData.features.length;
  let locationArray = [];
  for (let i = 0; i < len; i++) {
    locationArray.push(
      constructLocationObject(mapboxData.features[i])
    )
  }
  return locationArray
}

const populateSelect = (arrayId, mapboxData) => {
  let dropdown = document.querySelector(`select[id="${arrayId}"`);
  dropdown.length = 0;
  let defaultOption = document.createElement('option');
  defaultOption.text = '-- SELECT --';
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  locationArray = buildLocationArray(mapboxData);
  len = locationArray.length;
  let option;
  for (let i = 0; i < len; i ++) {
    option = document.createElement('option');
    option.value = locationArray[i].coords.searchString;
    option.text = locationArray[i].name.long;
    dropdown.add(option);
  }
}

const recordSelection = (e) => {
  let buttonId = e.target.id;
  let endpointType;
  if (buttonId === 'destination-select-button') {
    endpointType = 'destination';
  }
  if (buttonId === 'origin-select-button') {
    endpointType = 'origin';
  }
  let selectionId = document.querySelector(`select[id=${endpointType}]`).value
  displaySelection(endpointType, selectionId);
}

const destinationSelectButton = document.getElementById('destination-select-button');
const originSelectButton = document.getElementById('origin-select-button');

originSelectButton.onclick = recordSelection;
destinationSelectButton.onclick = recordSelection;

const displaySelection = (endpointType, locationId) => {
  let selectionText = document.querySelector(`option[value='${locationId}']`).textContent;
  let logId = `${endpointType}-selection-log`;
  document.getElementById(logId).textContent = selectionText;
  document.getElementById(logId).title = locationId;
}

const navigateButton = document.getElementById('submit-navigation');

const fetchNavigationCoords = (e) => {
  let confirmedOrigin = document.getElementById("origin-selection-log").title;
  let confirmedDestination = document.getElementById("destination-selection-log").title;
  // document.getElementById('navigationLog').textContent = `navigating ${confirmedOrigin} --> ${confirmedDestination}`
  document.getElementById('navigationLog').textContent = generateNavigationURL(confirmedOrigin, confirmedDestination);
  fetchNavigation(confirmedOrigin, confirmedDestination)
    .then((response) => {
      return response.json();
      })
    .then((data) => {
      console.log(data);
      window.logData = data
    })
}

navigateButton.onclick = fetchNavigationCoords;

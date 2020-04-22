// Goal: Build the necessary features, one step at a time.
// 1. html form/input to get user starting location; display input string
// originInputButton.onclick = function initiateSearch(e) {
//   let originInput = document.getElementById('origin-input').value;
//   document.getElementById('origin-log').textContent =
//     originInput.length > 0
//       ? `Searching for ${originInput} .....`
//       : "Please enter a value!";
//   fetchLocationSearch(originInput)
//     .then((response) => {return response.json();})
//     .then((data) => {populateSelect("origin-select", data)})
// }

//rebuild the above to be more general, e.g., also accept destination info
const originInputButton = document.getElementById('origin-input-button');
const destinationInputButton = document.getElementById('destination-input-button');

const readEndpointInput = (endpointType) => {
  return document.querySelector(`input[id=${endpointType}]`).value;
  // called multiple times hereafter as searchString
}

const setEndpointLog = (endpointType, logString) => {
//  searchString = readEndpointInput(endpointType);
  document.querySelector(`p[id=${endpointType}]`).textContent =
    logString;
      // searchString.length > 0
      //   ? `Searching for ${searchString} .....`
      //   : "Please enter a value!";
}

// detect which *-input-button is pressed
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


// 2. mapbox tools + fetch
let baseRequestURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const generateMapboxURL = (searchText) => {
  if (typeof searchText !== "string") {
    console.warn(`searchText {${searchText}} is not of type "string"`);
  } else {
    encodedSearchText = encodeURI(searchText);
    return `${baseRequestURL}${encodedSearchText}.json?access_token=${mapBoxToken}`;
  }
}

const fetchLocationSearch = (searchText) => {
  return fetch(generateMapboxURL(searchText))
}

// 3. parse and prepare to display the fetched place_names
// basic structure:
// tempLog.features.forEach(feature => {
//     console.log(feature.place_name);
// })

// build a single object associated with one feature fetched from Mapbox
const constructLocationObject = (inputFeature) => {
  let outputObject = {
    name: {
      short: inputFeature.text,
      long: inputFeature.place_name
    },
    coords: {
      lat: inputFeature.center[1],
      long: inputFeature.center[0]
    },
    id: inputFeature.id
  };
  return outputObject
}

// build an array of objects with place_name and other data
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

// clear & populate the select fields with location data
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
    option.value = locationArray[i].id; // not clear that this is the best "value" choice
    option.text = locationArray[i].name.long;
    dropdown.add(option);
  }
}

// re-build the recordSelection to accept both origin and destination
const recordSelection = (e) => {
  // detect button type and adjust
  let buttonId = e.target.id;
  let endpointType;
  if (buttonId === 'destination-select-button') {
    endpointType = 'destination';
  }
  if (buttonId === 'origin-select-button') {
    endpointType = 'origin';
  }
  console.log(`endpoint recorded as ${endpointType}`)
  let selectionValue = document.querySelector(`select[id=${endpointType}]`).value
  let selectionText = document.querySelector(`select[id=${endpointType}]`).text
  console.log(`selection recorded as ${selectionValue}: ${selectionText}`)
}

const destinationSelectButton = document.getElementById('destination-select-button');
const originSelectButton = document.getElementById('origin-select-button');

originSelectButton.onclick = recordSelection;
destinationSelectButton.onclick = recordSelection;

const displaySelection = () => {

}

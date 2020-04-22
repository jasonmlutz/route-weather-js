// Goal: Build the necessary features, one step at a time.
// 1. html form/input to get user starting location; display input string
document.getElementById('origin-input-button').onclick = function logSearchInitiation(e) {
  // note: e has no inpact on the function at this time.
  let originInput = document.getElementById('origin-input').value; // originInput in window element *ask*
  document.getElementById('origin-log').textContent =
    originInput.length > 0
      ? `Searching for ${originInput} .....`
      : "Please enter a value!";
      // TODO make this error handling more robust and organized
      // TODO loop in fetchLocationSearch here
  fetchLocationSearch(originInput)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      // console.log(data);
      // window.tempLog = data; // TODO remove this
      populateSelect("origin-select", data)
    })
}

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
  let dropdown = document.getElementById(arrayId);
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
    option.value = locationArray[i].id;
    option.text = locationArray[i].name.long;
    dropdown.add(option);
  }
}

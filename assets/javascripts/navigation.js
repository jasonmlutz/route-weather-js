// Goal: pull user input, fetch forward geocoding,  return results
// forward geocoding request format:
// mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json?${mapBoxToken}`

const baseRequestURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const generateMapboxURL = (searchText) => {
  if (typeof searchText != "string") {
    console.warn(`searchText {${searchText}} is not of type "string"`);
  } else {
      return `${baseRequestURL}${searchText}.json?access_token=${mapBoxToken}`;
  }
}


// This works, when entered one line at a time in the console .....
// need a promise?
const xhrLocationSearch = (searchText) => {
  xhr = new XMLHttpRequest();
  xhr.open('GET', generateMapboxURL(searchText));
  xhr.responseType = "json";
  xhr.send();
  return xhr.response
}

// Same response (?), native interaction with promises (?)
const fetchLocationSearch = (searchText) => {
  fetch(searchText).then(
    (response) => {
        return response.json();
    }).then(
    (data) => {
        console.log(data);
    })
}

// Basic structure for pulling the place_name field(s) from a response
const pullPlaceNames = (response) => {
  response.forEach(loc => {
    console.log(loc.place_name);
  }
)};

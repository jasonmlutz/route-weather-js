// Goal: pull user input, fetch forward geocoding,  return results
// forward geocoding request format:
// mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json?${mapBoxToken}`

let baseRequestURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
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
const fetchLocationSearch = (searchText, outputLoc) => {
  // TODO - implement encodeURI() for inputs like "spokane, wa"
  fetch(generateMapboxURL(searchText))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.outputLoc = data;
      console.log(data);
      data.features.forEach(loc => {
        console.log(loc.place_name)
      })
    })
}

// Basic structure for pulling the place_name field(s) from a response
const pullPlaceNames = (response) => {
  response.forEach(loc => {
    console.log(loc.place_name);
  }
)};

// // test log; form submit event listener
// function logSubmit(event) {
//   log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
//   event.preventDefault();
// }
//
// const log = document.getElementById('starting-point-log');
// const form = document.getElementById('starting-point-form');
//
// // event listener for form submit
// form.addEventListener('submit', logSubmit);

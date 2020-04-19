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
const initialLocationSearch = (searchText) => {
  xhr = new XMLHttpRequest();
  xhr.open('GET', generateMapboxURL(searchText));
  xhr.responseType = "json";
  xhr.send();
  return xhr.response
}

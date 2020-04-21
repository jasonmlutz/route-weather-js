// Goal: Build the necessary features, one step at a time.
// 1. html form/input to get user starting location; display input string
document.getElementById('origin-input-button').onclick = function logSearchInitiation() {
  // is this function notation "standard'? should I declare variables for this?
  document.getElementById('origin-log').textContent =
    `Preparing to search for ${document.getElementById('origin-input').value}.....`;
}

// 2. implement encodeURI() for inputs like "spokane, wa"

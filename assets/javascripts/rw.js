// let startingPointInput =
//  document.querySelector("input[id='starting-point-input']");
// let startingPointLog =
//  document.getElementById('starting-point-log');
//
// startingPointInput.oninput = handleInput;
//
// function handleInput(e) {
//   startingPointLog.textContent = `Preparing to search for
//       ${e.target.value}.....`;
// }

// Goal: Build the necessary features, one step at a time.
// [ ] 1. html form/input to get user starting location
document.getElementById('origin-input-button').onclick = function logSearchInitiation(e) {
  // is this function notation "standard'? should I declare variables for this?
  document.getElementById('origin-log').textContent = `Preparing to search for ${e.target.value}.....`;
}

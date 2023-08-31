const form = document.querySelector('form');
const addressInput = document.querySelector(
  '#addressInput'
)! as HTMLInputElement;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  console.log(enteredAddress);
  // send this to GoogleMaps API
}

form?.addEventListener('submit', searchAddressHandler);

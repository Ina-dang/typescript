import axios from 'axios';

const form = document.querySelector('form');
const addressInput = document.querySelector(
  '#addressInput'
)! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS'; //geo 공식문서에 더 있지만 일단 두개만 적음
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput?.value;
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${process.env.REACT_APP_GOOGLE_GEO_API}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('해당하는 장소가 없습니다');
      }
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.error(err);
    });
}

form?.addEventListener('submit', searchAddressHandler);

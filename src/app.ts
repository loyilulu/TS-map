import axios from "axios";

const API_KEY = "AIzaSyCy7dDyxDuuO9Gr3Fg_cx-BYOcA19b8MAk";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeoResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  console.log(enteredAddress);
  const googleRequestAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress
  )}&key=${API_KEY}`;

  axios
    .get<GoogleGeoResponse>(googleRequestAPI)
    .then((response) => {
      if (response.data.status != "OK") {
        throw new Error("Could not fetch the address");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map: map });
      console.log(coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });

  // send this to google API
}

form?.addEventListener("submit", searchAddressHandler);

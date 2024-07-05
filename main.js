const pollutionScale = [
  {
    scale: [0, 50],
    quality: "Good",
    src: "happy",
    background: "linear-gradient(to right, #45B649, #DCE35B)",
  },
  {
    scale: [51, 100],
    quality: "Moderate",
    src: "thinking",
    background: "linear-gradient(to right, #F3F9A7, #CAC531)",
  },
  {
    scale: [101, 150],
    quality: "Unhealthy",
    src: "unhealthy",
    background: "linear-gradient(to right, #F16529, #E44D26)",
  },
  {
    scale: [151, 200],
    quality: "Bad",
    src: "bad",
    background: "linear-gradient(to right, #ef473a, #cb2d3e)",
  },
  {
    scale: [201, 300],
    quality: "Very bad",
    src: "mask",
    background: "linear-gradient(to right, #8E54E9, #4776E6)",
  },
  {
    scale: [301, 500],
    quality: "Terrible",
    src: "terrible",
    background: "linear-gradient(to right, #7a2828, #a73737)",
  },
];

const loader = document.querySelector(".loader");
const emojiLogo = document.querySelector(".emoji-logo");

const userInformation = document.querySelector(".user-information");

async function getPollutionData() {
  try {
    const response = await fetch(
      "https://api.airvisual.com/v2/nearest_city?key=313cfe16-d168-4e35-b55a-ef8a19ab5a93"
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Error ${response.status}, ${response.status.statusText}`
      );
    } else {
      const responseData = await response.json();
      const aqi = responseData.data.current.pollution.aqius;
      console.log(responseData);
      const sortedData = {
        city: responseData.data.city,
        aqi,
        ...pollutionScale.find(
          (obj) => aqi >= obj.scale[0] && aqi <= obj.scale[1]
        ),
      };
      console.log(sortedData);
      populateUi(sortedData);
    }
  } catch (error) {
    console.log(error);
  }
}

getPollutionData();

const cityName = document.querySelector(".city-name");
const pollutionInfo = document.querySelector(".pollution-info");
const pollutionValue = document.querySelector(".pollution-value");
const backgroundLayer = document.querySelector(".background-layer");

function populateUi(data) {
  console.log(data);
  emojiLogo.src = `ressources/${data.src}.svg`;
  userInformation.textContent = `Here is ${data.city} situation.`;
  cityName.textContent = data.city;
  pollutionInfo.textContent = data.quality;
  pollutionValue.textContent = data.aqi;
  backgroundLayer.style.backgroundImage = data.background;

  pointerPlacement(data.aqi);
}

const locationPointer = document.querySelector(".location-pointer");

function pointerPlacement(AQIValue) {
  const parentWidth = locationPointer.parentElement.scrollWidth;
  //console.log(parentWidth);
  //console.log(AQIValue / 500);
  //console.log((AQIValue / 500) * parentWidth);
  locationPointer.style.transform = `translateX(${
    (AQIValue / 500) * parentWidth
  }px) rotate(180deg)`;
}

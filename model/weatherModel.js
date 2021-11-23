class WeatherModel {
  weatherData;

  weatherApiCall = async function (city) {
    const key = "5b572ff2d144a40a46832bf12b321acb";
    //   const response = await fetch(
    //     `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}
    //     `
    //   );
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=5b572ff2d144a40a46832bf12b321acb`
    );
    this.weatherData = await response.json();

    console.log(this.weatherData);
  };
}

const weatherModel = new WeatherModel();

export default weatherModel;

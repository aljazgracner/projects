class WeatherModel {
  weatherData = [];

  weatherApiCall = async function (city) {
    try {
      const key = "5b572ff2d144a40a46832bf12b321acb";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      this.weatherData.push(data.weather[0].description);
      this.weatherData.push(data.sys.country);
      this.weatherData.push(data.main.temp);
      this.weatherData.push(data.main.humidity);
      this.weatherData.push(data.coord.lat + ", " + data.coord.lon);
      this.weatherData.push(data.main.pressure);
    } catch (err) {
      throw err.message;
    }
  };

  removeState() {
    this.weatherData = [];
  }
}

const weatherModel = new WeatherModel();

export default weatherModel;

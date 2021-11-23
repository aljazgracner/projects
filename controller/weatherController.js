import weatherView from "../view/weatherView.js";
import weatherModel from "../model/weatherModel.js";

class WeatherController {
  weatherFormSubmitBind = this.weatherFormSubmit.bind(this);
  showWeatherForm() {
    weatherView.renderContent();
    weatherView.addWeatherOptionClickEventHandler(
      weatherView.markWeatherOption
    );
    weatherView.addSubmitEventHandler(this.weatherFormSubmitBind);
  }

  weatherFormSubmit() {
    try {
      weatherView.checkFormFields();
    } catch (err) {
      this.renderError(err);
    }
  }

  renderError(message) {
    console.log("works");
    weatherView.renderErrorMessage(message);
    weatherView.addErrorMessageClickEventHandler(
      weatherView.errorMessageClickFunction
    );
  }
}

export default new WeatherController();

const weatherApiCall = async function (city) {
  const key = "5b572ff2d144a40a46832bf12b321acb";
  //   const response = await fetch(
  //     `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}
  //     `
  //   );
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=5b572ff2d144a40a46832bf12b321acb`
  );
  const data = await response.json();

  console.log(data);
};

weatherApiCall("Ljubljana");

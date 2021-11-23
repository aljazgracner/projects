import weatherView from "../view/weatherView.js";
import weatherModel from "../model/weatherModel.js";

class WeatherController {
  showWeatherForm() {
    this.weatherFormSubmitBind = this.weatherFormSubmit.bind(this);
    weatherView.renderContent();
    weatherView.addWeatherOptionClickEventHandler(
      weatherView.markWeatherOption
    );
    weatherView.addSubmitEventHandler(this.weatherFormSubmitBind);
    weatherView.addHoverEventHandler(weatherView.hoverFunction);
  }

  weatherFormSubmit = async function () {
    try {
      this.resetBackToFormBind = this.resetBackToForm.bind(this);
      weatherView.checkFormFields();
      await weatherModel.weatherApiCall(weatherView.city);
      weatherView.renderResults(weatherModel.weatherData);
      weatherView.addResetEventHandler(this.resetBackToFormBind);
      weatherView.addHoverEventHandler(weatherView.hoverFunction);
    } catch (err) {
      this.renderError(err);
    }
  };

  renderError(message) {
    weatherView.renderErrorMessage(message);
    weatherView.addErrorMessageClickEventHandler(
      weatherView.errorMessageClickFunction
    );
  }

  resetBackToForm() {
    console.log("happens");
    weatherView.removeContent();
    weatherModel.removeState();
    this.showWeatherForm();
  }
}

export default new WeatherController();

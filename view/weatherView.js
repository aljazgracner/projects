import View from "./view.js";

class WeatherView extends View {
  weatherOptionsBox;
  selectedOptions = [];
  weatherOptions = [
    "Weather description",
    "Country",
    "Temperature",
    "Humidity",
    "Coordinates",
    "Pressure",
  ];
  _renderHTML() {
    const markup = ` <div class="weather-container"> 
    <form class="weather-input">
    <label>Name of city:</label>
    <input type="text" class="weather-input-box" />
    <div>What do you want to see?</div>
    <div class="weather-options">
      ${this.weatherOptions
        .map((option) => {
          return `<div class="weather-option">${option}</div>`;
        })
        .join("")}
    </div>
    <input class="weather-submit" type="submit" value="Show information" />
  </form>
      </div>  
           `;
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  addWeatherOptionClickEventHandler(fn) {
    this.weatherOptionsBox = document.querySelector(".weather-options");
    this.weatherOptionsBox.addEventListener("click", fn);
  }

  markWeatherOption(event) {
    const click = event.target.closest("div");
    if (!click.classList.contains("weather-option")) return;
    click.classList.toggle("clicked");
  }

  removeWeatherForm() {
    document.querySelector(".weather-container").innerHTML = "";
  }

  checkFormFields() {
    try {
      if (document.querySelector(".weather-input-box").value == "")
        throw new Error("You have to specify name of the city");
      const allOptions = document.querySelectorAll(".weather-option");
      if (
        ![...allOptions].some((option) => option.classList.contains("clicked"))
      )
        throw new Error("No options selected. Please select some :)");
    } catch (err) {
      throw err.message;
    }
  }

  addSubmitEventHandler(fn) {
    document
      .querySelector(".weather-container")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        fn();
      });
  }

  renderErrorMessage(error) {
    const markup = `<div class="weather-error">ERROR: <br>${error} <div class="weather-close-error">Return</div></div>`;
    this._contentContainer.insertAdjacentHTML("beforeend", markup);
    document.querySelector(".weather-container").classList.add("blur");
  }

  addErrorMessageClickEventHandler(fn) {
    document
      .querySelector(".weather-close-error")
      .addEventListener("click", fn);
  }

  errorMessageClickFunction() {
    const errorBox = document.querySelector(".weather-error");
    errorBox.parentNode.removeChild(errorBox);
    document.querySelector(".weather-container").classList.remove("blur");
  }

  renderResults() {
    const markup = `<div id="city">
    <i class='bx bx-arrow-back'></i>
    Results for city:</div>
    <div class="weather-results"> <div class="selected-option">ffff</div>
    <div class="selected-option">ffff</div>
    <div class="selected-option">ffff</div>
    </div>`;
  }
}

export default new WeatherView();

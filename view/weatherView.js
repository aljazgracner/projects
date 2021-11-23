import View from "./view.js";

class WeatherView extends View {
  weatherOptionsUnits = ["", "", "°C", "%", "(latitude, longitude)", "mbar"];
  selectedOptions = [];
  weatherOptions = [
    "Weather",
    "Country code",
    "Temperature",
    "Humidity",
    "Coordinates",
    "Atmospheric pressure",
  ];
  _renderHTML() {
    const markup = ` <div class="weather-container"> 
    <form class="weather-input">
    <label>City:</label>
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

  removeContent() {
    this._contentContainer.innerHTML = "";
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
      this.selectedOptions = [];
      this.city = document.querySelector(".weather-input-box").value;
      [...allOptions].forEach((option) => {
        option.classList.contains("clicked")
          ? this.selectedOptions.push(option.textContent)
          : this.selectedOptions.push(false);
      });
      console.log(this.selectedOptions);
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

  renderResults(weatherInfo) {
    this.removeContent();
    const city = this.city.charAt(0).toUpperCase() + this.city.slice(1);
    const markup = `<div class="weather-container"> 
    <div id="city">
    <i class='bx bx-arrow-back'></i>
    Results for ${city}:</div>
    <div class="weather-results">
    ${weatherInfo
      .map((property) => {
        const index = weatherInfo.indexOf(property);
        if (!this.selectedOptions[index]) return;
        return `<div class="selected-option">${this.selectedOptions[index]}: ${property} ${this.weatherOptionsUnits[index]}</div>`;
      })
      .join("")}
    </div></div>`;
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  addResetEventHandler(fn) {
    document.querySelector(".bx-arrow-back").addEventListener("click", fn);
  }

  addHoverEventHandler(fn) {
    ["mouseover", "mouseout"].forEach((event) =>
      document.querySelector(".weather-container").addEventListener(event, fn)
    );
  }

  hoverFunction(event) {
    const hover = event.target.closest("div");
    if (
      !hover.classList.contains("weather-option") &&
      !hover.classList.contains("weather-submit") &&
      !hover.classList.contains("selected-option")
    )
      return;
    hover.classList.toggle("mousehover");
  }
}

export default new WeatherView();

import { apiTimeout } from "../helpers.js";

class MapModule {
  location = {
    latitude: "",
    longitude: "",
  };
  date;
  markersAndText = [[], []];
  removeIndex;

  getDate() {
    this.date = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date());
  }
  removeState(state) {
    const slice = console.log(state.removedText);
    this.markersAndText[1].forEach((text) => {
      if (text.includes(state.removedText)) {
        console.log(this.removeIndex);
        this.removeIndex = this.markersAndText[1].indexOf(text);
      }
    });
  }

  getState(state) {
    this.markersAndText[0].push(state.currentMarker);
    this.markersAndText[1].push(state.fullText);
    console.log(this.markersAndText);
  }
  _getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async getPosition() {
    try {
      const response = await Promise.race([
        apiTimeout(),
        this._getCoordinates(),
      ]);
      this.location.latitude = response.coords.latitude;
      this.location.longitude = response.coords.longitude;
    } catch (err) {
      throw new Error();
    }
  }
}

const mapModule = new MapModule();

export default mapModule;
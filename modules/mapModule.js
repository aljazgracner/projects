import { apiTimeout } from "../helpers.js";
import cloneDeep from "../node_modules/lodash-es/cloneDeep.js";
class Marker {
  constructor(marker, text, date) {
    this.marker = marker;
    this.text = text;
    this.date = date;
  }
}

class MapModule {
  setLocalStorage = this._setLocalStorage.bind(this);
  arrayOfMarkers = [];
  location = {
    latitude: "",
    longitude: "",
  };
  date;
  removeIndex;
  markerToRemove;

  getDate() {
    this.date = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date());
  }
  getIndexToRemove(removedText) {
    if (!removedText) return;
    this.arrayOfMarkers.forEach((marker) => {
      if (removedText.includes(marker.date)) {
        this.removeIndex = this.arrayOfMarkers.indexOf(marker);
      }
    });
  }

  getMarkerToRemove() {
    if (this.removeIndex == "0")
      this.markerToRemove = this.arrayOfMarkers[this.removeIndex].marker;
    if (!this.removeIndex) return;
    this.markerToRemove = this.arrayOfMarkers[this.removeIndex].marker;
  }

  getState(state) {
    this.arrayOfMarkers.push(
      new Marker(state.currentMarker, state.markup, this.date)
    );
  }

  removeState() {
    this.arrayOfMarkers.splice(this.removeIndex, 1);
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

  _setLocalStorage() {
    if (!this.arrayOfMarkers) {
      localStorage.setItem("markers", JSON.stringify(this.arrayOfMarkers));
      return;
    }
    const arrayForJSON = cloneDeep(this.arrayOfMarkers);
    arrayForJSON.forEach((object) => {
      object.marker.lng ? "" : (object.marker = object.marker._latlng);
    });
    localStorage.setItem("markers", JSON.stringify(arrayForJSON));
  }

  getLocalStorage() {
    const checkLocalStorage = localStorage.getItem("markers");
    if (checkLocalStorage)
      this.arrayOfMarkers = [...JSON.parse(localStorage.getItem("markers"))];
  }
}

const mapModule = new MapModule();

export default mapModule;

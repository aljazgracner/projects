import { apiTimeout } from "../helpers.js";
import cloneDeep from "../node_modules/lodash-es/cloneDeep.js";
/** Class representing marker. */
class Marker {
  /**Creates marker.
   *@param {object} marker - marker properties used to display on map.
   *@param {string} text - whole html code for sidebar log.
   *@param {object} date - date/time of placed marker.
   */
  constructor(marker, text, date) {
    this.marker = marker;
    this.text = text;
    this.date = date;
  }
}

class MapModel {
  setLocalStorage = this._setLocalStorage.bind(this);
  arrayOfMarkers = [];
  location = {
    latitude: "",
    longitude: "",
  };
  date;
  markerIndex;
  currentMarker;

  /** Stores current date in variable*/
  getDate() {
    this.date = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date());
  }

  /** Retrieves index of marker/log based on received log text and stores it in variable.
   *@param {string} text - log text.
   */
  getIndex(text) {
    if (!text) return;
    this.arrayOfMarkers.forEach((marker) => {
      if (text.includes(marker.date)) {
        this.markerIndex = this.arrayOfMarkers.indexOf(marker);
      }
    });
  }
  /** Retrieves marker properties by using index number and stores it in variable*/
  getMarker() {
    if (this.markerIndex == "0")
      this.currentMarker = this.arrayOfMarkers[this.markerIndex].marker;
    if (!this.markerIndex) return;
    this.currentMarker = this.arrayOfMarkers[this.markerIndex].marker;
  }
  /**Pushes new marker object in array of temporarily stored markers
   * @param {object} state - properties of marker.
   */
  getState(state) {
    this.arrayOfMarkers.push(
      new Marker(state.currentMarker, state.markup, this.date)
    );
  }
  /** Removes marker properties from temporary array by using index number */
  removeState() {
    this.arrayOfMarkers.splice(this.markerIndex, 1);
  }

  /** Gets coordinates of user
   *@returns {object} - resolved or rejected promise.
   */
  _getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  /** Saves user coords in variable, times out if geolocation takes too long */
  async getPosition() {
    try {
      const response = await Promise.race([
        apiTimeout(),
        this._getCoordinates(),
      ]);
      this.location.latitude = response.coords.latitude;
      this.location.longitude = response.coords.longitude;
    } catch (err) {
      throw new Error(err);
    }
  }

  /** Saves markers in json format to localstorage.*/
  _setLocalStorage() {
    if (!this.arrayOfMarkers) return;
    //Deep copy of marker array -> removal of properties on marker object, because circular reference doesn't let me stringify full marker object.
    //Deep copy is done because marker properties in arrayOfMarkers are still used in app and it causes bugs if they are directly removed.
    const arrayForJSON = cloneDeep(this.arrayOfMarkers);
    arrayForJSON.forEach((object) => {
      object.marker = object.marker._latlng;
    });
    localStorage.setItem("markers", JSON.stringify(arrayForJSON));
  }

  /** Retrieves localstorage from user. */
  getLocalStorage() {
    const checkLocalStorage = localStorage.getItem("markers");
    if (checkLocalStorage)
      this.arrayOfMarkers = [...JSON.parse(localStorage.getItem("markers"))];
  }
}

const mapModel = new MapModel();

export default mapModel;

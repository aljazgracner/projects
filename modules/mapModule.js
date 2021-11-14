import { apiTimeout } from "../helpers.js";

class MapModule {
  location = {
    latitude: "",
    longitude: "",
  };

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

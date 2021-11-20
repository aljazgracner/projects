import mapView from "../view/mapView.js";
import mapModule from "../modules/mapModule.js";

class MapLogsControl {
  isMobile;
  /**Storing functions to variables to set this keyword inside functions to class scope. */
  showMapLogs = this._showMapLogs.bind(this);
  deleteMarker = this._deleteMarker.bind(this);
  moveToMarker = this._moveToMarker.bind(this);

  /**Renders whole MapLogs structure to user. Before rendering it waits for geolocation api to finish fetching user coords. Then checks for local storage and renders saved logs/markers.*/
  async _showMapLogs() {
    mapView.isMobile = this.isMobile;
    await mapModule.getPosition();
    mapView.renderContent();
    mapView.renderMap(mapModule.location);
    mapModule.getLocalStorage();
    mapView.loadSavedArray(mapModule.arrayOfMarkers);
    /**Adds all necessary event handlers */
    mapView.addMapClickEventHandler(mapView.prepareMarkerText);
    mapView.addSubmitEventHandler(this.newMarker);
    mapView.addSidebarClickEventHandler(this.deleteMarker, this.moveToMarker);
    mapView.addLogsHoverEventHandler(mapView.logsHoverFunction, this.isMobile);
  }
  /**Renders marker to map/log to sidebar and saves state to local storage.
   * @param {object} event - later used to prevent default submit behaviour.
   * */
  newMarker(event) {
    mapView.renderMarker(event);
    mapModule.getDate();
    mapView.renderText(mapModule.date);
    mapModule.getState(mapView);
    mapModule.setLocalStorage();
  }

  /** Deletes marker when delete log icon is clicked and saves state to local storage.
   * @param {object} event - later used to determine deleted log/marker..
   */
  _deleteMarker(event) {
    if (!event.target.closest("i")) return;
    mapView.deleteMarkerFromView(event);
    mapModule.getIndex(mapView.logText);
    mapModule.getMarker();
    mapView.removeMarker(mapModule.currentMarker);
    mapModule.removeState();
    mapModule.setLocalStorage();
  }
  /**When user clicks on sidebar log, map pans to selected marker. */
  _moveToMarker(event) {
    if (!mapView._checkIfLogClicked(event)) return;
    mapModule.getIndex(mapView.logText);
    mapModule.getMarker();
    mapView._panToMarker(mapModule.currentMarker);
  }
}

export default new MapLogsControl();

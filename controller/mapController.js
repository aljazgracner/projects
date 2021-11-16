import mapView from "../view/mapView.js";
import mapModule from "../modules/mapModule.js";

class MapMarkerControl {
  showMapLogs = this._showMapLogs.bind(this);
  deleteMarker = this._deleteMarker.bind(this);
  moveToMarker = this._moveToMarker.bind(this);

  async _showMapLogs() {
    await mapModule.getPosition();
    mapView.renderContent();
    mapView.renderMap(mapModule.location);
    mapView.addMapClickEventHandler(mapView.prepareMarkerText);
    mapView.addSubmitEventHandler(this.newMarker);
    mapView.addMarkerBoxClickEventHandler(this.deleteMarker, this.moveToMarker);
    mapModule.getLocalStorage();
    mapView.loadSavedArray(mapModule.arrayOfMarkers);
    mapView.addLogsHoverEventHandler(mapView.logsHoverFunction);
  }

  newMarker(submit) {
    mapView.renderMarker(submit);
    mapModule.getDate();
    mapView.renderText(mapModule.date);
    mapModule.getState(mapView);
    mapModule.setLocalStorage();
  }

  _deleteMarker(event) {
    if (!event.target.closest("i")) return;
    mapView.deleteMarkerFromView(event);
    mapModule.getIndex(mapView.logText);
    mapModule.getMarker();
    mapView.removeMarker(mapModule.currentMarker);
    mapModule.removeState();
    mapModule.setLocalStorage();
  }

  _moveToMarker(event) {
    if (!mapView._checkIfLogClicked(event)) return;
    mapModule.getIndex(mapView.logText);
    mapModule.getMarker();
    mapView._panToMarker(mapModule.currentMarker._latlng);
  }
}

export default new MapMarkerControl();

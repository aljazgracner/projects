import mapView from "../view/mapView.js";
import mapModule from "../modules/mapModule.js";

class MapMarkerControl {
  showMapLogs = this._showMapLogs.bind(this);
  focusOrDeleteMark = this.focusOrDeleteMarker.bind(this);

  async _showMapLogs() {
    await mapModule.getPosition();
    mapView.renderContent();
    mapView.renderMap(mapModule.location);
    mapView.addMapClickEventHandler(mapView.prepareMarkerText);
    mapView.addSubmitEventHandler(this.newMarkerMapLogs);
    mapView.addMarkerBoxClickEventHandler(this.focusOrDeleteMark);
  }

  newMarkerMapLogs(submit) {
    mapView.renderMarker(submit);
    mapModule.getDate();
    mapView.renderText(mapModule.date);
    mapView.addHoverEventHandler(mapView.hoverFunction);
    mapModule.getState(mapView);
  }

  focusOrDeleteMarker(event) {
    if (mapView.checkClickedOption(event)) {
      mapModule.removeState(mapView);
    } else {
      console.log("else");
    }
  }
}

export default new MapMarkerControl();

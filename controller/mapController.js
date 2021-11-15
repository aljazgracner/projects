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
    console.log(mapModule.markersAndText);
  }

  focusOrDeleteMarker(event) {
    if (mapView.checkClickedOption(event)) {
      console.log("lkll");
      mapModule.removeState(mapView.removedText);
    }
    if (!mapView.checkClickedOption(event)) {
    }
  }
}

export default new MapMarkerControl();

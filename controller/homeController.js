import ticTacController from "./ticTacController.js";
import mapController from "./mapController.js";
import headerView from "../view/headerView.js";
import ticTacToeView from "../view/ticTacToeView.js";
import ticTacModule from "../modules/ticTacModule.js";
import mapView from "../view/mapView.js";
import mapModule from "../modules/mapModule.js";
import homeView from "../view/homeView.js";
import { timeout } from "../helpers.js";

class Controller {
  currentOption;
  showHome = this._showHome.bind(this);
  filterClickedContent = this._filterClickedContent.bind(this);

  constructor() {
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction);
    homeView.addClickEventHandler(this.filterClickedContent);
    headerView.addHoverEventHandlers(headerView.hoverFunction);
    headerView.addClickHandler(this.showHome);
  }

  _showHome() {
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction);
    homeView.addClickEventHandler(this.filterClickedContent);
  }

  _filterClickedContent(event) {
    this.currentOption = homeView.checkClickedOption(event);
    if (!this.currentOption) return;
    this.currentOption === "Tic Tac Toe"
      ? ticTacController.showTicTacToe()
      : "";
    this.currentOption === "Map Logs" ? mapController.showMapLogs() : "";
  }

  // async _showMapLogs() {
  //   await mapModule.getPosition();
  //   mapView.renderContent();
  //   mapView.renderMap(mapModule.location);
  //   mapView.addMapClickEventHandler(mapView.prepareMarkerText);
  //   mapView.addSubmitEventHandler(this.newMarkerMapLogs);
  //   mapView.addMarkerBoxClickEventHandler(this.focusOrDeleteMarker);
  // }

  // newMarkerMapLogs(submit) {
  //   mapView.renderMarker(submit);
  //   mapModule.getDate();
  //   mapView.renderText(mapModule.date);
  //   mapView.addHoverEventHandler(mapView.hoverFunction);
  //   mapModule.getState(mapView);
  //   console.log(mapModule.markersAndText);
  // }

  // _focusOrDeleteMarker(event) {
  //   if (mapView.checkClickedOption(event)) {
  //     console.log("lkll");
  //     mapModule.removeState(mapView.removedText);
  //   }
  //   if (!mapView.checkClickedOption(event)) {
  //   }
  // }
}

const initialize = new Controller();

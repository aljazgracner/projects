import ticTacController from "./ticTacController.js";
import mapController from "./mapController.js";
import headerView from "../view/headerView.js";
import homeView from "../view/homeView.js";
import homeModule from "../modules/homeModule.js";

class HomeController {
  isMobile;
  currentOption;
  showHome = this._showHome.bind(this);
  loadClickedContent = this._loadClickedContent.bind(this);

  constructor() {
    mapController.isMobile =
      ticTacController.isMobile =
      this.isMobile =
        homeModule.checkForMobile();
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction, this.isMobile);
    homeView.addClickEventHandler(this.loadClickedContent);
    headerView.addHoverEventHandlers(headerView.hoverFunction, this.isMobile);
    headerView.addClickHandler(this.showHome);
  }

  _showHome() {
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction);
    homeView.addClickEventHandler(this.loadClickedContent);
  }

  _loadClickedContent(event) {
    this.currentOption = homeView.checkClickedOption(event);
    if (!this.currentOption) return;
    this.currentOption === "Tic Tac Toe"
      ? ticTacController.showTicTacToe()
      : "";
    this.currentOption === "Map Logs" ? mapController.showMapLogs() : "";
  }
}

const app = new HomeController();

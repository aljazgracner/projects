import ticTacController from "./ticTacController.js";
import mapController from "./mapController.js";
import headerView from "../view/headerView.js";
import homeView from "../view/homeView.js";
import homeModule from "../modules/homeModule.js";

class HomeController {
  isMobile;
  currentOption;
  /**Storing functions to variables to set this keyword inside functions to class scope. */
  showHome = this._showHome.bind(this);
  loadClickedContent = this._loadClickedContent.bind(this);

  constructor() {
    /**When website is opened, module first checks if user is on mobile device. After that homepage is rendered. */
    mapController.isMobile =
      ticTacController.isMobile =
      this.isMobile =
        homeModule.checkForMobile();
    homeView.renderContent();
    /**Adds hover/click events to homepage. */
    homeView.addHoverEventHandler(homeView.hoverFunction, this.isMobile);
    homeView.addClickEventHandler(this.loadClickedContent);
    headerView.addHoverEventHandlers(headerView.hoverFunction, this.isMobile);
    headerView.addClickHandler(this.showHome);
  }
  /** Renders all project options on homepage and adds event handlers to them. */
  _showHome() {
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction);
    homeView.addClickEventHandler(this.loadClickedContent);
  }
  /**Clicked project is saved to variable, which is used to determine which project to load.
   * @param {object} event - later used to get name of clicked project.
   */
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

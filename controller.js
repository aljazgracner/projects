import navigationView from "./view/navView.js";
import ticTacToeView from "./view/ticTacToeView.js";
import ticTacModule from "./modules/ticTacModule.js";
import mapView from "./view/mapView.js";
import mapModule from "./modules/mapModule.js";
import homeView from "./view/homeView.js";

class Controller {
  currentOption;
  showHome = this._showHome.bind(this);
  filterClickedContent = this._filterClickedContent.bind(this);
  showTicTacToe = this._showTicTacToe.bind(this);
  playTicTac = this.playTicTacToe.bind(this);
  replayTicTac = this.replayTicTacToe.bind(this);
  playAgainTicTac = this.playAgainTicTacToe.bind(this);
  loadTicTacStateWithWinner = this.loadTicTacToeStateWithWinner.bind(this);

  constructor() {
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction);
    homeView.addClickEventHandler(this.filterClickedContent);
    navigationView.addHoverEventHandlers(navigationView.hoverFunction);
    navigationView.addClickHandler(this.showHome);
  }

  _showHome() {
    homeView.renderContent();
    homeView.addHoverEventHandler(homeView.hoverFunction);
    homeView.addClickEventHandler(this.filterClickedContent);
  }

  _filterClickedContent(event) {
    this.currentOption = homeView.checkClickedOption(event);
    if (!this.currentOption) return;
    if (this.currentOption === "Tic Tac Toe") this.showTicTacToe();
    this.currentOption === "Map Marker" ? this.showMapMarker() : "";
  }

  _showTicTacToe() {
    console.log("lll");
    ticTacToeView.renderContent();
    ticTacToeView.loadSave(ticTacModule);
    if (ticTacModule.winner) this.loadTicTacStateWithWinner();
    if (!ticTacModule.winner) {
      ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
      ticTacToeView.addClickEventHandler(this.playTicTac);
    }
    ticTacToeView.addPlayAgainHoverEvent(ticTacToeView.playAgainHoverFunction);
    ticTacToeView.addPlayAgainClickEvent(this.playAgainTicTac);
    ticTacToeView.addHoverHandler(ticTacToeView.hoverFunction);
  }

  playTicTacToe(clickedBox) {
    if (ticTacToeView.checkIfBoxEmpty(clickedBox)) {
      ticTacToeView.createMark(clickedBox, ticTacModule.activePlayer);
      ticTacModule.updateBoardState(clickedBox);
      ticTacModule.changeActivePlayer();
      ticTacModule.checkForWinner();

      if (ticTacModule.winner) this.loadTicTacStateWithWinner();
      if (!ticTacModule.winner)
        ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
    }
  }

  loadTicTacToeStateWithWinner() {
    ticTacToeView.renderWinner(
      ticTacModule.winner,
      ticTacModule.winningNumbers
    );
    ticTacToeView.removeClickEventHandler(this.playTicTac);
    ticTacToeView.addReplayButtonHoverEvent(
      ticTacToeView.replayButtonHoverFunction
    );
    ticTacToeView.addReplayButtonClickEvent(this.replayTicTacToe);
  }

  replayTicTacToe() {
    ticTacToeView.removeMarks(ticTacModule.boardState[2]);
    ticTacToeView.createMark(
      null,
      null,
      ticTacModule.boardState[2],
      ticTacModule.winningNumbers
    );
  }

  playAgainTicTacToe() {
    ticTacToeView.removeMarks(ticTacModule.boardState[2]);
    ticTacToeView.highlightTicTacBoxOnOff(ticTacModule.winningNumbers);
    ticTacModule.resetGameState();
    ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
    ticTacToeView.addClickEventHandler(this.playTicTac);
    ticTacToeView.removeButtons();
  }

  async loadMap() {
    mapView.renderContent();
    await mapModule.getPosition();
    mapView.renderMap(mapModule.location);
    //  mapView.addHoverEventHandler(mapView.hoverFunction);
  }
}

const initialize = new Controller();

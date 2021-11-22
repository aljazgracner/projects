import ticTacToeView from "../view/ticTacToeView.js";
import ticTacModule from "../modules/ticTacModule.js";

class TicTacToeControl {
  isMobile;
  /**Storing functions to variables to set this keyword to class scope. */
  showTicTac = this.showTicTacToe.bind(this);
  placeMarkerOnClick = this._placeMarkerOnClick.bind(this);
  replayTicTac = this.replayTicTacToe.bind(this);
  resetTicTac = this.resetTicTacToe.bind(this);
  loadTicTacStateWithWinner = this.loadTicTacToeStateWithWinner.bind(this);

  /**Renders whole tic tac toe structure, once rendered it checks the module if the game state is fresh, mid-progress or finished and loads the state */
  showTicTacToe() {
    ticTacToeView.renderContent();
    ticTacToeView.loadSave(ticTacModule);
    if (ticTacModule.winner) this.loadTicTacStateWithWinner();
    if (!ticTacModule.winner) {
      ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
      ticTacToeView.addClickEventHandler(this.placeMarkerOnClick);
    }
    ticTacToeView.addResetHoverEvent(
      ticTacToeView.resetHoverFunction,
      this.isMobile
    );
    ticTacToeView.addResetClickEvent(this.resetTicTac);
    ticTacToeView.addHoverHandler(ticTacToeView.hoverFunction, this.isMobile);
  }

  /**Activates on click while playing. First checks if box is empty, after that checks for winning combination -> renders winner if true, changes active player if false. */
  _placeMarkerOnClick(clickedBox) {
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
  /**If the game is finished, user clicks on another project and comes back without resetting state, this loads. */
  loadTicTacToeStateWithWinner() {
    ticTacToeView.renderWinner(
      ticTacModule.winner,
      ticTacModule.winningNumbers
    );
    ticTacToeView.removeClickEventHandler(this.placeMarkerOnClick);
    ticTacToeView.addReplayButtonHoverEvent(
      ticTacToeView.replayButtonHoverFunction,
      this.isMobile
    );
    ticTacToeView.addReplayButtonClickEvent(this.replayTicTacToe);
    ticTacToeView.scrollToBottom();
  }
  /** Renders stored sequence of clicks from module to view with 0.5s interval. */
  async replayTicTacToe() {
    ticTacToeView.scrollToTop();
    ticTacToeView.removeMarks(ticTacModule.boardState[2]);
    ticTacToeView.createMark(
      null,
      null,
      ticTacModule.boardState[2],
      ticTacModule.winningNumbers
    );
  }
  /**Resets game state in module and updates view. */
  resetTicTacToe() {
    ticTacToeView.scrollToTop();
    ticTacToeView.removeMarks(ticTacModule.boardState[2]);
    ticTacToeView.highLightTicTacBoxToggle(ticTacModule.winningNumbers);
    ticTacModule.resetGameState();
    ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
    ticTacToeView.addClickEventHandler(this.placeMarkerOnClick);
    ticTacToeView.removeButtons();
  }
}

export default new TicTacToeControl();

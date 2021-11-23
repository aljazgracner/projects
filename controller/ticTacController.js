import ticTacToeView from "../view/ticTacToeView.js";
import ticTacToeModel from "../model/ticTacToeModel.js";

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
    ticTacToeView.loadSave(ticTacToeModel);
    if (ticTacToeModel.winner) this.loadTicTacStateWithWinner();
    if (!ticTacToeModel.winner) {
      ticTacToeView.changeActivePlayer(ticTacToeModel.activePlayer);
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
      ticTacToeView.createMark(clickedBox, ticTacToeModel.activePlayer);
      ticTacToeModel.updateBoardState(clickedBox);
      ticTacToeModel.changeActivePlayer();
      ticTacToeModel.checkForWinner();

      if (ticTacToeModel.winner) this.loadTicTacStateWithWinner();
      if (!ticTacToeModel.winner)
        ticTacToeView.changeActivePlayer(ticTacToeModel.activePlayer);
    }
  }
  /**If the game is finished, user clicks on another project and comes back without resetting state, this loads. */
  loadTicTacToeStateWithWinner() {
    ticTacToeView.renderWinner(
      ticTacToeModel.winner,
      ticTacToeModel.winningNumbers
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
    ticTacToeView.removeMarks(ticTacToeModel.boardState[2]);
    ticTacToeView.createMark(
      null,
      null,
      ticTacToeModel.boardState[2],
      ticTacToeModel.winningNumbers
    );
  }
  /**Resets game state in module and updates view. */
  resetTicTacToe() {
    ticTacToeView.scrollToTop();
    ticTacToeView.removeMarks(ticTacToeModel.boardState[2]);
    ticTacToeView.highLightTicTacBoxToggle(ticTacToeModel.winningNumbers);
    ticTacToeModel.resetGameState();
    ticTacToeView.changeActivePlayer(ticTacToeModel.activePlayer);
    ticTacToeView.addClickEventHandler(this.placeMarkerOnClick);
    ticTacToeView.removeButtons();
  }
}

export default new TicTacToeControl();

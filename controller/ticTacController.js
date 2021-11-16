import ticTacToeView from "../view/ticTacToeView.js";
import ticTacModule from "../modules/ticTacModule.js";

class TicTacToeControl {
  isMobile;
  showTicTac = this.showTicTacToe.bind(this);
  playTicTac = this.playTicTacToe.bind(this);
  replayTicTac = this.replayTicTacToe.bind(this);
  playAgainTicTac = this.playAgainTicTacToe.bind(this);
  loadTicTacStateWithWinner = this.loadTicTacToeStateWithWinner.bind(this);

  showTicTacToe() {
    ticTacToeView.renderContent();
    ticTacToeView.loadSave(ticTacModule);
    if (ticTacModule.winner) this.loadTicTacStateWithWinner();
    if (!ticTacModule.winner) {
      ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
      ticTacToeView.addClickEventHandler(this.playTicTac);
    }
    ticTacToeView.addPlayAgainHoverEvent(ticTacToeView.playAgainHoverFunction);
    ticTacToeView.addPlayAgainClickEvent(this.playAgainTicTac);
    console.log("pred hover handler");
    ticTacToeView.addHoverHandler(ticTacToeView.hoverFunction, this.isMobile);
    console.log("po hover handler");
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
    ticTacToeView.scrollToBottom();
  }

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

  playAgainTicTacToe() {
    ticTacToeView.scrollToTop();
    ticTacToeView.removeMarks(ticTacModule.boardState[2]);
    ticTacToeView.highlightTicTacBoxOnOff(ticTacModule.winningNumbers);
    ticTacModule.resetGameState();
    ticTacToeView.changeActivePlayer(ticTacModule.activePlayer);
    ticTacToeView.addClickEventHandler(this.playTicTac);
    ticTacToeView.removeButtons();
  }
}

export default new TicTacToeControl();

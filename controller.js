import navigationView from "./view/navView.js";
import ticTacToeView from "./view/ticTacToeView.js";
import ticTacModule from "./modules/ticTacModule.js";

class Controller {
  playTicTac = this.playTicTacToe.bind(this);
  replayTicTac = this.replayTicTacToe.bind(this);
  playAgainTicTac = this.playAgainTicTacToe.bind(this);

  constructor() {
    navigationView.addHoverEventHandlers(navigationView.hoverFunction);
    navigationView.addClickHandler(this.showContent.bind(this));
  }

  showContent() {
    ticTacToeView.renderContent(navigationView.clickedContent);
    ticTacToeView.addClickEventHandler(this.playTicTac);
    ticTacToeView.addHoverHandler(ticTacToeView.hoverFunction);
  }

  playTicTacToe(clickedBox) {
    if (ticTacToeView.checkIfBoxEmpty(clickedBox)) {
      ticTacToeView.createMark(clickedBox, ticTacModule.activePlayer);
      ticTacModule.updateBoardState(clickedBox);
      ticTacModule.changeActivePlayer();
      ticTacModule.checkForWinner();

      if (ticTacModule.winner) {
        console.log(ticTacModule.winningNumbers);
        ticTacToeView.renderWinner(
          ticTacModule.winner,
          ticTacModule.winningNumbers
        );
        ticTacToeView.removeClickEventHandler(this.playTicTac);
        ticTacToeView.addReplayButtonHoverEvent(
          ticTacToeView.replayButtonHoverFunction
        );
        ticTacToeView.addReplayButtonClickEvent(this.replayTicTacToe);
        ticTacToeView.addPlayAgainHoverEvent(
          ticTacToeView.playAgainHoverFunction
        );
        ticTacToeView.addPlayAgainClickEvent(this.playAgainTicTac);
      }
      if (!ticTacModule.winner)
        ticTacToeView.highlightActivePlayer(ticTacModule.activePlayer);
    }
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
    ticTacToeView.highlightActivePlayer(ticTacModule.activePlayer);
    ticTacToeView.addClickEventHandler(this.playTicTac);
    ticTacToeView.removeButtons();
  }
}

const initialize = new Controller();

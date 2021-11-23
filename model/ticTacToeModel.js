class TicTacToeModel {
  activePlayer = "X";
  winner;
  winningNumbers = "";
  boardState = [[], [], []]; // [0] - player 1, [1] - player 2, [2] - both together

  /** Resets game state... */
  resetGameState() {
    this.winner = "";
    this.boardState = [[], [], []];
    this.activePlayer = "X";
    this.winningNumbers = "";
  }

  /** Compares winning combinations to both players states after every tic tac toe tile click */
  checkForWinner() {
    const winningCombos = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    winningCombos.forEach((winningNumbers) => {
      //Player 1
      if (
        winningNumbers.every((number) => this.boardState[0].includes(number))
      ) {
        // Transforming to set to eliminate duplicate tile numbers in case player gets 2 winning combinations.
        this.winningNumbers = new Set([
          ...this.winningNumbers,
          ...winningNumbers,
        ]);
        this.winner = "Player 1";
      }
      //Player 2
      if (
        winningNumbers.every((number) => this.boardState[1].includes(number))
      ) {
        this.winningNumbers = new Set([
          ...this.winningNumbers,
          ...winningNumbers,
        ]);
        this.winner = "Player 2";
      }
      //Checks if all tiles are used.
      if (this.boardState[2].length == 9 && !this.winner)
        this.winner = "Nobody";
    });
  }

  /** Changes active player after every move. */
  changeActivePlayer() {
    this.activePlayer == "X"
      ? (this.activePlayer = "O")
      : (this.activePlayer = "X");
  }

  /** Updates board state in module.*/
  updateBoardState(clickedBox) {
    const boxNumber = clickedBox.target.closest("div").getAttribute("id");
    this.activePlayer == "X"
      ? this.boardState[0].push(Number(boxNumber))
      : this.boardState[1].push(Number(boxNumber));
    this.boardState[2].push(Number(boxNumber));
  }
}

const ticTacToeModel = new TicTacToeModel();

export default ticTacToeModel;

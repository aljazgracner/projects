class Module {
  activePlayer = "X";
  winner;
  winningNumbers = "";
  boardState = [[], [], []];
  resetGameState() {
    this.winner = "";
    this.boardState = [[], [], []];
    this.activePlayer = "X";
    this.winningNumbers = "";
  }
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
      if (
        winningNumbers.every((number) => this.boardState[0].includes(number))
      ) {
        this.winningNumbers = new Set([
          ...this.winningNumbers,
          ...winningNumbers,
        ]);
        this.winner = "Player 1";
      }
      if (
        winningNumbers.every((number) => this.boardState[1].includes(number))
      ) {
        this.winningNumbers = new Set([
          ...this.winningNumbers,
          ...winningNumbers,
        ]);
        this.winner = "Player 2";
      }
      if (this.boardState[2].length == 9) this.winner = "Nobody";
    });
  }
  changeActivePlayer() {
    this.activePlayer == "X"
      ? (this.activePlayer = "O")
      : (this.activePlayer = "X");
  }
  updateBoardState(clickedBox) {
    const boxNumber = clickedBox.target.closest("div").getAttribute("id");
    this.activePlayer == "X"
      ? this.boardState[0].push(Number(boxNumber))
      : this.boardState[1].push(Number(boxNumber));
    this.boardState[2].push(Number(boxNumber));
  }
}

const ticTacModule = new Module();

export default ticTacModule;

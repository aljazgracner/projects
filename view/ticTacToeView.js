import View from "./view.js";
import { timeout } from "../helpers.js";

class TicTacToeView extends View {
  _renderHTML() {
    const markup = `<div class="tic-tac-toe">
    <div class="tic-tac-box" id="1"></div>
    <div class="tic-tac-box" id="2"></div>
    <div class="tic-tac-box" id="3"></div>
    <div class="tic-tac-box" id="4"></div>
    <div class="tic-tac-box" id="5"></div>
    <div class="tic-tac-box" id="6"></div>
    <div class="tic-tac-box" id="7"></div>
    <div class="tic-tac-box" id="8"></div>
    <div class="tic-tac-box" id="9"></div>
</div>
<div class="tic-tac-player">
            <div class="tic-tac-player-box">
                <span class="player-1 player active-player">Player 1</span>
                <span class="player-2 player">Player 2</span>
                <span class="turn">Active turn</span>
            </div>
            <div class="tic-tac-player-box win-msg"></div>
            <div class="tic-tac-player-box play"><a href=#>
            <div class="play-again">
                Reset
            </div>
        </a></div>
           </div>
        `;
    this._contentContainer.style.flexWrap = "wrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  addClickEventHandler(fn) {
    const ticTacContainer = document.querySelector(".tic-tac-toe");
    ticTacContainer.addEventListener("click", fn, true);
  }

  removeClickEventHandler(fn) {
    const ticTacContainer = document.querySelector(".tic-tac-toe");
    ticTacContainer.removeEventListener("click", fn, true);
  }

  addHoverHandler(fn) {
    ["mouseover", "mouseout"].forEach((e) =>
      document.querySelector(".tic-tac-toe").addEventListener(e, function (e) {
        fn(e);
      })
    );
  }

  hoverFunction(hover) {
    if (hover.target.closest("div").classList.contains("tic-tac-toe")) return;
    hover.target.closest("div").classList.toggle("mousehover");
  }

  checkIfBoxEmpty(clickedBox) {
    if (clickedBox.target.closest("div").classList.contains("tic-tac-toe"))
      return false;
    if (!clickedBox.target.closest("div").textContent == "") return false;
    return true;
  }

  removeMarks(replayArray) {
    [...replayArray].forEach((e) => {
      document.getElementById(e).innerHTML = "";
    });
  }

  loadSave(save) {
    this.createMark(null, null, save.boardState[2], save.boxNumbers, false);
  }

  createMark(clickedBox, activePlayer, replayArray, boxNumbers, replay = true) {
    if (!replayArray && clickedBox) {
      clickedBox.target
        .closest("div")
        .insertAdjacentHTML("afterbegin", activePlayer);
    }
    if (replayArray) {
      (async () => {
        boxNumbers ? this.highlightTicTacBoxOnOff(boxNumbers) : "";
        let crossCircle = "X";
        for (const x of replayArray) {
          replay ? await timeout(0.5) : "";
          const box = document.getElementById(x);
          if (box.innerHTML == "")
            box.insertAdjacentHTML("afterbegin", crossCircle);
          crossCircle == "X" ? (crossCircle = "O") : (crossCircle = "X");
        }
        boxNumbers ? this.highlightTicTacBoxOnOff(boxNumbers) : "";
      })();
    }
  }

  changeActivePlayer(player) {
    const player1 = document.querySelector(".player-1");
    const player2 = document.querySelector(".player-2");
    if (player == "X") {
      player1.classList.add("active-player");
      player2.classList.remove("active-player");
    } else {
      player1.classList.remove("active-player");
      player2.classList.add("active-player");
    }
  }

  highlightTicTacBoxOnOff(boxNumbers) {
    [...boxNumbers].forEach((number) => {
      document.getElementById(number).classList.toggle("win-color");
    });
  }

  renderWinner(player, boxNumbers) {
    const markup = `<span class="win-message">${player} wins!</span>
    <a href=#>
                        <div class="watch-replay">
                            Watch replay
                        </div>
                    </a>`;
    document.querySelector(".win-msg").insertAdjacentHTML("afterbegin", markup);

    this.highlightTicTacBoxOnOff(boxNumbers);
  }

  addReplayButtonHoverEvent(fn) {
    const button = document.querySelector(".watch-replay");
    ["mouseout", "mouseover"].forEach((e) => {
      button.addEventListener(e, fn);
    });
  }

  replayButtonHoverFunction(event) {
    event.target.closest(".watch-replay").classList.toggle("replay-hover");
  }

  addReplayButtonClickEvent(fn) {
    const button = document.querySelector(".watch-replay");
    button.addEventListener("click", fn);
  }

  addPlayAgainHoverEvent(fn) {
    const button = document.querySelector(".play-again");
    ["mouseout", "mouseover"].forEach((e) => {
      button.addEventListener(e, fn);
    });
  }

  playAgainHoverFunction(event) {
    event.target.closest(".play-again").classList.toggle("replay-hover");
  }

  addPlayAgainClickEvent(fn) {
    const button = document.querySelector(".play-again");
    button.addEventListener("click", fn);
  }

  removeButtons() {
    const replayButton = document.querySelector(".win-msg");
    replayButton.innerHTML = "";
  }
}

export default new TicTacToeView();

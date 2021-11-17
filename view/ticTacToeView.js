import View from "./view.js";
import { timeout } from "../helpers.js";

class TicTacToeView extends View {
  hoverEvents;
  playAgainButton;
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
    this.playAgainButton = document.querySelector(".play-again");
  }

  addClickEventHandler(fn) {
    const ticTacContainer = document.querySelector(".tic-tac-toe");
    ticTacContainer.addEventListener("click", fn, true);
  }

  removeClickEventHandler(fn) {
    const ticTacContainer = document.querySelector(".tic-tac-toe");
    ticTacContainer.removeEventListener("click", fn, true);
  }

  addHoverHandler(fn, isMobile) {
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) =>
      document.querySelector(".tic-tac-toe").addEventListener(event, fn)
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

  scrollToTop() {
    this._contentContainer.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  scrollToBottom() {
    this._contentContainer.scrollTo({
      top: this._contentContainer.scrollHeight,
      behavior: "smooth",
    });
  }

  createMark(clickedBox, activePlayer, replayArray, boxNumbers, replay = true) {
    if (!replayArray && clickedBox) {
      clickedBox.target
        .closest("div")
        .insertAdjacentHTML("afterbegin", activePlayer);
      return;
    }

    if (replayArray && replay) {
      (async () => {
        [".play-again", ".watch-replay"].forEach((className) => {
          document.querySelector(className).style.display = "none";
        });
        boxNumbers ? this.highlightTicTacBoxOnOff(boxNumbers) : "";
        let crossCircle = "X";
        for (const marker of replayArray) {
          await timeout(0.5);
          const box = document.getElementById(marker);
          if (box.innerHTML == "")
            box.insertAdjacentHTML("afterbegin", crossCircle);
          crossCircle == "X" ? (crossCircle = "O") : (crossCircle = "X");
        }
        boxNumbers ? this.highlightTicTacBoxOnOff(boxNumbers) : "";
        [".play-again", ".watch-replay"].forEach((className) => {
          document.querySelector(className).style.display = null;
        });
      })();
      return;
    }
    if (replayArray && !replay) {
      let crossCircle = "X";
      for (const marker of replayArray) {
        const box = document.getElementById(marker);
        if (box.innerHTML == "")
          box.insertAdjacentHTML("afterbegin", crossCircle);
        crossCircle == "X" ? (crossCircle = "O") : (crossCircle = "X");
      }
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

  addReplayButtonHoverEvent(fn, isMobile) {
    const button = document.querySelector(".watch-replay");
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) => button.addEventListener(event, fn));
  }

  replayButtonHoverFunction(event) {
    event.target.closest(".watch-replay").classList.toggle("replay-hover");
  }

  addReplayButtonClickEvent(fn) {
    const button = document.querySelector(".watch-replay");
    button.addEventListener("click", fn);
  }

  addPlayAgainHoverEvent(fn, isMobile) {
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) =>
      this.playAgainButton.addEventListener(event, fn)
    );
  }

  playAgainHoverFunction(event) {
    event.target.closest(".play-again").classList.toggle("replay-hover");
  }

  addPlayAgainClickEvent(fn) {
    this.playAgainButton.addEventListener("click", fn);
  }

  removeButtons() {
    const replayButton = document.querySelector(".win-msg");
    replayButton.innerHTML = "";
  }
}

export default new TicTacToeView();

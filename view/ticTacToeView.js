import View from "./view.js";
import { timeout } from "../helpers.js";

class TicTacToeView extends View {
  hoverEvents;
  playAgainButton;
  /**Renders tic tac toe */
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
            <div class="tic-tac-player-box play">
            <div class="play-again">
                Reset
            </div>
        </div>
           </div>
        `;
    this._contentContainer.style.flexWrap = "wrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
    this.playAgainButton = document.querySelector(".play-again");
  }

  /** Adds click event handler.
   * @param {object} fn - callback function added to eventlistener.
   */
  addClickEventHandler(fn) {
    const ticTacContainer = document.querySelector(".tic-tac-toe");
    ticTacContainer.addEventListener("click", fn, true);
  }

  /** Removes click event handler.
   * @param {object} fn - callback function added to eventlistener.
   */
  removeClickEventHandler(fn) {
    const ticTacContainer = document.querySelector(".tic-tac-toe");
    ticTacContainer.removeEventListener("click", fn, true);
  }
  /** Adds hover event handler.
   * @param {object} fn - callback function added to eventlistener.
   * @param {boolean} isMobile - to determine which event types make sense to use.
   */
  addHoverHandler(fn, isMobile) {
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) =>
      document.querySelector(".tic-tac-toe").addEventListener(event, fn)
    );
  }

  /** Mousehover function for tic tac toe tiles.
   * @param {object} hover - event reference.
   */
  hoverFunction(hover) {
    if (hover.target.closest("div").classList.contains("tic-tac-toe")) return;
    hover.target.closest("div").classList.toggle("mousehover");
  }
  /**  Function that checks if tic tac toe tile is clicked and then if empty.
   * @param {object} clickedBox - event reference.
   * @returns {boolean}.
   */
  checkIfBoxEmpty(clickedBox) {
    if (clickedBox.target.closest("div").classList.contains("tic-tac-toe"))
      return false;
    if (!clickedBox.target.closest("div").textContent == "") return false;
    return true;
  }

  /** Function that removes circles/crosses from tic tac toe tiles.
   * @param {object} replayArray - array with stored tile clicks in order.
   */
  removeMarks(replayArray) {
    replayArray.forEach((box) => {
      document.getElementById(box).innerHTML = "";
    });
  }

  /** Loads saved state whenever user clicks on tic tac toe page again during the same session.
   * @param {object} save - object that contains whole state of tic tac toe board.
   */
  loadSave(save) {
    this.createMark(null, null, save.boardState[2], save.boxNumbers, false);
  }

  /** Fires whenever user is on mobile device to refocus tic tac toe board on button click.*/
  scrollToTop() {
    this._contentContainer.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  /** Fires whenever user is on mobile device to focus available options after finished game. */
  scrollToBottom() {
    this._contentContainer.scrollTo({
      top: this._contentContainer.scrollHeight,
      behavior: "smooth",
    });
  }

  /** Renders crosses/circles on tic tac toe board.
   * @param {object} clickedBox - event reference.
   * @param {string} activePlayer - current active player.
   * @param {object} replayArray - array of clicked tic tac toe tiles in order.
   * @param {object} boxNumbers - array of game winning tic tac toe tiles.
   * @param {boolean} replay - whether function is used for replay or not.
   */
  createMark(clickedBox, activePlayer, replayArray, boxNumbers, replay = true) {
    // When tic tac toe tile is clicked during the game.
    if (!replayArray && clickedBox) {
      clickedBox.target
        .closest("div")
        .insertAdjacentHTML("afterbegin", activePlayer);
      return;
    }
    //When user wants a replay.
    if (replayArray && replay) {
      (async () => {
        [".play-again", ".watch-replay"].forEach((className) => {
          document.querySelector(className).style.display = "none";
        });
        boxNumbers ? this.highLightTicTacBoxToggle(boxNumbers) : "";
        let crossCircle = "X";
        for (const marker of replayArray) {
          await timeout(0.5);
          const box = document.getElementById(marker);
          if (box.innerHTML == "")
            box.insertAdjacentHTML("afterbegin", crossCircle);
          crossCircle == "X" ? (crossCircle = "O") : (crossCircle = "X");
        }
        boxNumbers ? this.highLightTicTacBoxToggle(boxNumbers) : "";
        [".play-again", ".watch-replay"].forEach((className) => {
          document.querySelector(className).style.display = null;
        });
      })();
      return;
    }
    //When game state is loaded.
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
  /** Changes player after every successful mark render.
   * @param {string} player - current player.
   */
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
  /** Changes color of winning tic tac tiles. */
  highLightTicTacBoxToggle(boxNumbers) {
    boxNumbers.forEach((number) => {
      document.getElementById(number).classList.toggle("win-color");
    });
  }
  /** Activates when game is finished. Renders winning message
   * @param {string} player - player who won.
   * @param {object} boxNumbers - array of winning tic tac toe tiles.
   */
  renderWinner(player, boxNumbers) {
    const markup = `<span class="win-message">${player} wins!</span>
                        <div class="watch-replay">
                            Watch replay
                        </div>
                    `;
    document.querySelector(".win-msg").insertAdjacentHTML("afterbegin", markup);

    this.highLightTicTacBoxToggle(boxNumbers);
  }
  /** Adds hover event function to replay button.
   * @param {object} fn - callback function added to eventlistener.
   * @param {boolean} isMobile - to determine if applying eventlisteners make sense.
   */
  addReplayButtonHoverEvent(fn, isMobile) {
    const button = document.querySelector(".watch-replay");
    if (isMobile) return;
    ["mouseover", "mouseout"].forEach((event) =>
      button.addEventListener(event, fn)
    );
  }
  /** Hover function for replay button.
   * @param {object} event - event reference.
   */
  replayButtonHoverFunction(event) {
    event.target.closest(".watch-replay").classList.toggle("replay-hover");
  }

  /** Click event handler for replay button.
   * @param {object} fn - callback function added to eventlistener.
   */
  addReplayButtonClickEvent(fn) {
    const button = document.querySelector(".watch-replay");
    button.addEventListener("click", fn);
  }

  /** Adds hover event function to reset button.
   * @param {object} fn - callback function added to eventlistener.
   * @param {boolean} isMobile - to determine if applying eventslisteners make sense.
   */
  addResetHoverEvent(fn, isMobile) {
    if (isMobile) return;
    ["mouseover", "mouseout"].forEach((event) =>
      this.playAgainButton.addEventListener(event, fn)
    );
  }

  /** Hover function for reset button
   * @param {object} event - event reference.
   */
  resetHoverFunction(event) {
    event.target.closest(".play-again").classList.toggle("replay-hover");
  }

  /** Adds click event function to reset button.
   * @param {object} fn - callback function added to eventlistener.
   */
  addResetClickEvent(fn) {
    this.playAgainButton.addEventListener("click", fn);
  }

  /**Removes replay button. */
  removeButtons() {
    const replayButton = document.querySelector(".win-msg");
    replayButton.innerHTML = "";
  }
}

export default new TicTacToeView();

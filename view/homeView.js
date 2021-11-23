import View from "./view.js";

class HomeView extends View {
  hoverEvents;
  /** Renders homepage. */
  _renderHTML() {
    const markup = `<div class="home-box">
    <span class="nav-link">Tic Tac Toe</span>
    <i class="bx bx-joystick"></i>
  </div>
  
  <div class="home-box">
    <span class="nav-link">Map Logs</span> <i class="bx bx-map-pin"></i>
  </div>
  
  <div class="home-box">
    <span class="nav-link">Weather</span> <i class="bx bx-sun"></i>
  </div>
  `;
    this._contentContainer.style.flexWrap = "wrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
    this._contentContainer.style.flexDirection = null;
  }

  /** Adds hover event function to project buttons.
   * @param {object} fn - callback function added to eventlistener.
   * @param {boolean} isMobile - to determine if applying eventslisteners make sense.
   */
  addHoverEventHandler(fn, isMobile) {
    if (isMobile) return;

    ["mouseover", "mouseout"].forEach((event) =>
      this._contentContainer.addEventListener(event, fn)
    );
  }

  /** Hover function for project buttons
   * @param {object} event - event reference.
   */
  hoverFunction(event) {
    const homeOption = event.target.closest("div");
    if (!homeOption.classList.contains("home-box")) return;
    homeOption.classList.toggle("home-box-hover");
  }

  /** Adds click event function to project buttons.
   * @param {object} fn - callback function added to eventlistener.
   */
  addClickEventHandler(fn) {
    this._contentContainer.addEventListener("click", fn);
  }

  /** Checks which project user clicked.
   * @param {object} event - event reference.
   * @returns {string} - name of clicked project.
   */
  checkClickedOption(event) {
    const click = event.target.closest("div");
    if (!click.classList.contains("home-box")) return;
    return click.querySelector("span").textContent;
  }
}

export default new HomeView();

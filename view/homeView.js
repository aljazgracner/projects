import View from "./view.js";

class HomeView extends View {
  hoverEvents;
  _renderHTML() {
    const markup = `<a href="#">     
        <div class="home-box">
            <span class="nav-link">Tic Tac Toe</span>
            <i class='bx bx-joystick' ></i>
        </div>
    </a> 
    <a href="#"> 
        <div class="home-box"><span class="nav-link">Map Logs</span> 
            <i class='bx bx-map-pin' ></i></div>
        </a> 
        <a href="#"></a>
        <div class="home-box"></div></a> `;
    this._contentContainer.style.flexWrap = "wrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
    this._contentContainer.style.flexDirection = null;
  }

  addHoverEventHandler(fn, isMobile) {
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) =>
      this._contentContainer.addEventListener(event, fn)
    );
  }

  hoverFunction(e) {
    const homeOption = e.target.closest("div");
    if (!homeOption.classList.contains("home-box")) return;
    homeOption.classList.toggle("home-box-hover");
  }

  addClickEventHandler(fn) {
    this._contentContainer.addEventListener("click", fn);
  }

  checkClickedOption(event) {
    const click = event.target.closest("div");
    if (!click.classList.contains("home-box")) return;
    return click.querySelector("span").textContent;
  }
}

export default new HomeView();

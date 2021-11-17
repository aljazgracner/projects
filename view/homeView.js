import View from "./view.js";

class HomeView extends View {
  hoverEvents;
  _renderHTML() {
    const markup = `    
        <div class="home-box">
            <span class="nav-link">Tic Tac Toe</span>
            <i class='bx bx-joystick' ></i>
        </div>
    
    
        <div class="home-box"><span class="nav-link">Map Logs</span> 
            <i class='bx bx-map-pin' ></i></div>
        
        
        <div class="home-box"></div> `;
    this._contentContainer.style.flexWrap = "wrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
    this._contentContainer.style.flexDirection = null;
  }

  addHoverEventHandler(fn, isMobile) {
    if (isMobile) return;

    ["mouseover", "mouseout"].forEach((event) =>
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

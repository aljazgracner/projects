class NavigationView {
  hoverEvents;
  _navigation = document.querySelector(".header");

  addHoverEventHandlers(fn, isMobile) {
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) =>
      this._navigation.addEventListener(event, fn)
    );
  }

  hoverFunction(e) {
    const navLink = e.target.closest("span");
    if (!navLink) return;
    navLink.classList.toggle("nav-mousehover");
  }

  addClickHandler(fn) {
    this._navigation.addEventListener("click", fn);
  }
}

export default new NavigationView();

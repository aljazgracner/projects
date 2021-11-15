class NavigationView {
  _navigation = document.querySelector(".header");

  addHoverEventHandlers(fn) {
    ["mouseover", "mouseout"].forEach((e) => {
      this._navigation.addEventListener(e, fn);
    });
  }

  hoverFunction(e) {
    const navLink = e.target.closest("a");
    if (!navLink) return;
    navLink.classList.toggle("nav-mousehover");
  }

  addClickHandler(fn) {
    this._navigation.addEventListener("click", fn);
  }
}

export default new NavigationView();

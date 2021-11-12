class NavigationView {
  _navigation = document.querySelector(".menu");
  _allOptions = document.querySelectorAll(".nav-option");

  addHoverEventHandlers(fn) {
    ["mouseover", "mouseout"].forEach((condition) => {
      this._navigation.addEventListener(condition, function (e) {
        fn(e);
      });
    });
  }

  hoverFunction(e) {
    if (e.target.closest("div").classList.contains("menu-option")) {
      const navLink = e.target.closest("div");
      navLink.classList.toggle("mousehover");
      navLink.querySelector("i").classList.toggle("bx-tada");
    }
  }

  addClickHandler(fn) {
    this._navigation.addEventListener("click", fn);
  }

  checkClickedContent(clickEvent) {
    if (clickEvent.target.closest("div").classList.contains("menu-option"))
      return true;
    return false;
  }
}

export default new NavigationView();

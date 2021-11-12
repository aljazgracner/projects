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
    this._navigation.addEventListener("click", function (click) {
      fn(click.target);
    });
  }

  checkClickedContent(clickEvent) {
    if (clickEvent.closest("menu-option") == "undefined") return;
    return clickEvent.closest(".menu-option").querySelector("span").textContent;
  }
}

export default new NavigationView();

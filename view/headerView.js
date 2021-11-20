class NavigationView {
  hoverEvents;
  _navigation = document.querySelector(".header");

  /** Adds hover event function to title.
   * @param {object} fn - callback function added to eventlistener.
   * @param {boolean} isMobile - to determine which event types make sense.
   */
  addHoverEventHandlers(fn, isMobile) {
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) =>
      this._navigation.addEventListener(event, fn)
    );
  }

  /** Hover function for title.*/
  hoverFunction(event) {
    const title = event.target.closest("span");
    if (!title) return;
    title.classList.toggle("header-mousehover");
  }

  /** Adds click event function to title.
   * @param {object} fn - callback function added to eventlistener.
   */
  addClickHandler(fn) {
    this._navigation.addEventListener("click", fn);
  }
}

export default new NavigationView();

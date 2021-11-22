import View from "./view.js";

class MapView extends View {
  hoverEvents;
  isMobile;
  markup;
  logText;
  prepareMarkerText = this._prepareMarkerText.bind(this);
  showForm = this._showForm.bind(this);
  renderMarker = this._renderMarker.bind(this);
  deleteMarkerFromView = this._deleteMarkerFromView.bind(this);
  _map;
  currentMarker;
  emptySidebarMessage = ` <div class="sidebar-empty-message">
  No saved logs yet. Start by clicking on map <br>
  <i class='bx bx-map'></i>
</div>     `;
  inputForm = `
        <form class="${this.isMobile ? "form-mobile" : "form"}">
            <legend>Enter Log</legend>
            <input class='form' required /><br>
            <button id="form" type="submit" class="button">Save</button>
    </form>`;
  _renderHTML() {
    const markup = `
    <div class="sidebar-box">
        ${this.emptySidebarMessage}   
    </div>
    <div id="map">
    </div>
    `;
    this._contentContainer.style.flexWrap = "nowrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  /** Adds hover function.
   * @param {object} fn - callback function added to eventlistener.
   * @param {*} isMobile - to determine if applying eventslisteners make sense.
   */
  addLogsHoverEventHandler(fn, isMobile) {
    const sidebar = document.querySelector(".sidebar-box");
    this.hoverEvents = isMobile
      ? ["touchstart", "touchend"]
      : ["mouseover", "mouseout"];
    this.hoverEvents.forEach((event) => sidebar.addEventListener(event, fn));
  }

  /** Hover function for sidebar logs.
   *@param {object} event - reference to event.
   */
  logsHoverFunction(event) {
    if (!event.target.closest("div").classList.contains("marker")) return;
    event.target.closest("div").classList.toggle("mousehover-map");
  }

  /** Renders map to view.
   *@param {object} location - coordinates of user,
   */
  renderMap(location) {
    console.log(location);
    this._map = L.map("map").setView(
      [location.latitude, location.longitude],
      15
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this._map);
    this._mobileStyles(this.isMobile);
  }

  /** Creates css styling for mobile devices.
   *@param {boolean} isMobile - whether user is on mobile or not.
   */
  _mobileStyles(isMobile) {
    if (!isMobile) return;
    document.querySelector(".content-container").style.flexDirection = "column";
    document.querySelector("#map").style.height = "70%";
    document.querySelector(".sidebar-box").style.height = "30%";
    document.querySelector(".sidebar-box").style.width = "100%";
  }

  /** Adds click function to map.
   * @param {object} fn - callback function added to eventlistener.
   */
  addMapClickEventHandler(fn) {
    this._map.on("click", fn);
  }

  /** Adds sidebar click function.
   * @param {array} fn - callback functions added to eventlistener.
   */
  addSidebarClickEventHandler(...fn) {
    const sidebar = document.querySelector(".sidebar-box");
    fn.forEach((fn) => {
      sidebar.addEventListener("click", fn);
    });
  }

  /** Creates map marker and stores in variable.
   *@param {object} event - event reference.
   */
  _prepareMarkerText(event) {
    this.currentMarker = L.marker([event.latlng.lat, event.latlng.lng]);
    this.showForm();
  }

  /** Renders marker to view.
   *@param {object} event - event reference.
   */
  _renderMarker(event) {
    event.preventDefault();
    const markup = document.querySelector("input").value;
    this.markup = markup;
    this.currentMarker
      .addTo(this._map)
      .bindPopup(
        L.popup({
          minWidth: 100,
          maxWidth: 200,
          autoPan: false,
        })
      )
      .setPopupContent(markup)
      .openPopup();
    this._hideForm();
  }

  /** Renders log input form to sidebar. */
  _showForm() {
    const sidebar = document.querySelector(".sidebar-box");
    if (sidebar.querySelector(".form")) return;
    sidebar.insertAdjacentHTML("afterbegin", this.inputForm);
    const inputFocus = document.querySelector("input");
    inputFocus.focus();
  }

  /** Removes log input form from sidebar. */
  _hideForm() {
    const sidebar = document.querySelector(".sidebar-box");
    const form = document.querySelector("form");
    sidebar.removeChild(form);
  }

  /** Renders sidebar empty message when no logs on sidebar and vice versa. */
  _checkIfsidebarEmpty() {
    const sidebar = document.querySelector(".sidebar-box");
    const emptyBoxText = document.querySelector(".sidebar-empty-message");
    //checks if sidebar has rendered logs, removes emptysidebarmessage if true
    if (sidebar.querySelector(".marker") && emptyBoxText)
      sidebar.removeChild(emptyBoxText);
    //checks if sidebar empty, renders emptysidebarmessage if true.
    if (!sidebar.querySelector(".marker") && !emptyBoxText) {
      sidebar.insertAdjacentHTML("afterbegin", this.emptySidebarMessage);
    }
  }

  /** Adds sidebar submit function.
   * @param {array} fn - callback function added to eventlistener.
   */
  addSubmitEventHandler(fn) {
    const sidebar = document.querySelector(".sidebar-box");
    sidebar.addEventListener("submit", fn);
  }

  /** Renders log message to sidebar.
   *@param {string} date - date/time of log.
   */
  renderText(date) {
    console.log(typeof date);
    const sidebar = document.querySelector(".sidebar-box");
    const markup = `<div class="marker"><span class="log-text">On ${date} <i class='bx bx-checkbox-minus close' ></i><br>
    Message: ${this.markup}</span></div>`;
    sidebar.insertAdjacentHTML("afterbegin", markup);
    this._checkIfsidebarEmpty();
  }

  /** Renders logs to sidebar.
   *@param {array} array - array of objects.
   */
  loadSavedArray(array) {
    if (array.length == 0) return;
    const sidebar = document.querySelector(".sidebar-box");
    array.forEach((object) => {
      const markup = `<div class="marker"><span class="log-text">On ${object.date}<i class='bx bx-checkbox-minus close' ></i><br>
      Message: ${object.text}</span></div>`;
      sidebar.insertAdjacentHTML("afterbegin", markup);
    });
    this._loadSavedMarkers(array);
    this._checkIfsidebarEmpty();
  }

  /** Renders markers from array to map.
   *@param {array} array - array of objects.
   */
  _loadSavedMarkers(array) {
    array.forEach((object) => {
      const newMarker = L.marker([object.marker.lat, object.marker.lng]);
      newMarker
        .addTo(this._map)
        .bindPopup(
          L.popup({
            minWidth: 100,
            maxWidth: 200,
            autoPan: false,
          })
        )
        .setPopupContent(object.text);
      object.marker = newMarker;
    });
  }

  /** Checks if user clicked on actual log on sidebar.
   *@param {object} event - event reference.
   *@returns {boolean}
   */
  _checkIfLogClicked(event) {
    const logContainer = event.target.closest("div");
    if (!logContainer) return false;
    if (!logContainer.classList.contains("marker")) return false;
    if (event.target.classList.contains("close")) return false;
    this.logText = logContainer.textContent;
    return true;
  }

  /** Pans map view to marker referenced by clicked log on sidebar and opens its popup.
   * @param {object} marker - map marker.
   */
  _panToMarker(marker) {
    this._map.panTo(marker._latlng);
    marker.openPopup();
  }

  /** Removes marker from map view referenced by clicked log on sidebar.
   * @param {object} event - event reference.
   */
  _deleteMarkerFromView(event) {
    if (!event.target.closest("i")) return;
    const clickedLog = event.target.closest("div");
    this.logText = clickedLog.textContent;
    this._removeText(clickedLog);
  }

  /** Removes log text from sidebar view.
   * @param {object} element - whole html <div> element of sidebar log.
   */
  _removeText(element) {
    const sidebar = document.querySelector(".sidebar-box");
    sidebar.removeChild(element);
  }

  removeMarker(marker) {
    console.log(marker);
    if (!marker) return;
    marker.remove();
    this._checkIfsidebarEmpty();
  }
}

export default new MapView();

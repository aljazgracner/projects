import View from "./view.js";

class MapView extends View {
  markup;
  removedText;
  prepareMarkerText = this._prepareMarkerText.bind(this);
  showForm = this._showForm.bind(this);
  renderMarker = this._renderMarker.bind(this);
  deleteMarkerFromView = this._deleteMarkerFromView.bind(this);
  _map;
  currentMarker;
  _renderHTML() {
    const markup = `
    <div class="map-markers-box">
        <div class="map-text">
            No saved markers yet. Start by clicking on map <br>
            <i class='bx bx-map'></i>
        </div>     
    </div>
    <div id="map">
    </div>
    `;
    this._contentContainer.style.flexWrap = "nowrap";
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  addLogsHoverEventHandler(fn) {
    const mapMarkers = document.querySelector(".map-markers-box");
    ["mouseout", "mouseover"].forEach((e) => {
      mapMarkers.addEventListener(e, fn);
    });
  }

  saveHoverEventFunction(event) {
    if (!event.target.closest("div").classList.contains("marker-save")) return;
    event.target.classList.toggle("marker-hover");
  }

  logsHoverFunction(event) {
    if (!event.target.closest("div").classList.contains("marker")) return;
    event.target.closest("div").classList.toggle("mousehover-map");
  }

  renderMap(location) {
    this._map = L.map("map").setView(
      [location.latitude, location.longitude],
      15
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this._map);
  }

  addMapClickEventHandler(fn) {
    this._map.on("click", fn);
  }

  addMarkerBoxClickEventHandler(fn) {
    const markerBox = document.querySelector(".map-markers-box");
    markerBox.addEventListener("click", fn);
  }

  _prepareMarkerText(event) {
    this.currentMarker = L.marker([event.latlng.lat, event.latlng.lng]);
    this.showForm();
  }
  _renderMarker(submit) {
    const markup = document.querySelector("input").value;
    submit.preventDefault();
    this.markup = markup;
    this.currentMarker.addTo(this._map).bindPopup(markup).openPopup();
    this._hideForm();
  }
  _showForm() {
    const mapMarkers = document.querySelector(".map-markers-box");
    if (mapMarkers.querySelector(".form")) return;
    const markup = `
        <form class="form">
        <fieldset>
            <legend>Enter Log</legend>
            <input class='form' required /><br>
            <button id="form" type="submit" class="button">Save</button>
        </fieldset>
    </form>`;
    this._checkIfMarkerBoxEmpty();
    mapMarkers.insertAdjacentHTML("beforeend", markup);
    const inputFocus = document.querySelector("input");
    inputFocus.focus();
  }

  _hideForm() {
    const mapMarkers = document.querySelector(".map-markers-box");
    const form = document.querySelector("form");
    mapMarkers.removeChild(form);
  }

  _checkIfMarkerBoxEmpty() {
    const markerBox = document.querySelector(".map-markers-box");
    if (markerBox.querySelector(".map-text")) markerBox.innerHTML = "";
  }
  _addSaveButton() {
    const markerBox = document.querySelector(".map-markers-box");
    if (markerBox.querySelector(".marker-save")) return;
    const saveButton = `<a href="#"><div class="marker-save">>Save logs<</div></a>`;
    markerBox.insertAdjacentHTML("afterbegin", saveButton);
  }

  _removeSaveButton() {
    const markerBox = document.querySelector(".map-markers-box");
    const saveButton = markerBox.querySelector("a");
    if (markerBox.querySelector(".marker")) return;
    markerBox.removeChild(saveButton);
  }

  addSubmitEventHandler(fn) {
    const mapMarkers = document.querySelector(".map-markers-box");
    mapMarkers.addEventListener("submit", fn);
  }

  renderText(date) {
    this._addSaveButton();
    const mapMarkers = document.querySelector(".map-markers-box");
    const markup = `<a href='#'><div class="marker">On ${date} <i class='bx bx-checkbox-minus close' ></i><br>
    Message: ${this.markup}</div></a>`;
    mapMarkers.insertAdjacentHTML("beforeend", markup);
  }

  loadSavedArray(array) {
    if (array.length == 0) return;
    this._checkIfMarkerBoxEmpty();
    this._addSaveButton();
    const mapMarkers = document.querySelector(".map-markers-box");
    array.forEach((object) => {
      const markup = `<a href='#'><div class="marker">On ${object.date} <i class='bx bx-checkbox-minus close' ></i><br>
      Message: ${object.text}</div></a>`;
      mapMarkers.insertAdjacentHTML("beforeend", markup);
    });
    this._loadSavedMarkers(array);
  }

  _loadSavedMarkers(array) {
    array.forEach((object) => {
      const newMarker = L.marker([object.marker.lat, object.marker.lng]);
      newMarker.addTo(this._map).bindPopup(object.text);
      object.marker = newMarker;
    });
  }

  _deleteMarkerFromView(event) {
    if (!event.target.closest("i")) return;
    const close = event.target.closest("a");
    this.removedText = close.querySelector(".marker").textContent;
    this._removeText(close);
  }

  _removeText(element) {
    const markerBox = document.querySelector(".map-markers-box");
    markerBox.removeChild(element);
  }

  removeMarker(marker) {
    console.log(marker);
    if (!marker) return;
    console.log("happens");
    marker.remove();
  }
}

export default new MapView();

import View from "./view.js";

class MapView extends View {
  isMobile;
  markup;
  logText;
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
            No saved logs yet. Start by clicking on map <br>
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
    console.log(this.isMobile);
    if (this.isMobile) {
      document.querySelector(".content-container").style.flexDirection =
        "column";
      document.querySelector("#map").style.height = "70%";
      document.querySelector(".map-markers-box").style.height = "30%";
      document.querySelector(".map-markers-box").style.width = "100%";
    }
  }

  addMapClickEventHandler(fn) {
    this._map.on("click", fn);
  }

  addMarkerBoxClickEventHandler(...fn) {
    const markerBox = document.querySelector(".map-markers-box");
    fn.forEach((fn) => {
      markerBox.addEventListener("click", fn);
    });
  }

  _prepareMarkerText(event) {
    this.currentMarker = L.marker([event.latlng.lat, event.latlng.lng]);
    this.showForm();
  }
  _renderMarker(submit) {
    const markup = document.querySelector("input").value;
    submit.preventDefault();
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
  _showForm() {
    const mapMarkers = document.querySelector(".map-markers-box");
    if (mapMarkers.querySelector(".form")) return;
    const form = this.isMobile ? "form-mobile" : "form";
    const markup = `
        <form class="${form}">
            <legend>Enter Log</legend>
            <input class='form' required /><br>
            <button id="form" type="submit" class="button">Save</button>
    </form>`;
    mapMarkers.insertAdjacentHTML("afterbegin", markup);
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
    const emptyBoxText = document.querySelector(".map-text");
    if (markerBox.querySelector(".marker") && emptyBoxText)
      markerBox.removeChild(emptyBoxText);
    const markup = `<div class="map-text">
    No saved logs yet. Start by clicking on map <br>
    <i class='bx bx-map'></i>
</div> `;
    if (!markerBox.querySelector(".marker") && !emptyBoxText) {
      markerBox.insertAdjacentHTML("afterbegin", markup);
    }
  }

  addSubmitEventHandler(fn) {
    const mapMarkers = document.querySelector(".map-markers-box");
    mapMarkers.addEventListener("submit", fn);
  }

  renderText(date) {
    const mapMarkers = document.querySelector(".map-markers-box");
    const markup = `<a href='#'><div class="marker"><span class="log-text">On ${date} <i class='bx bx-checkbox-minus close' ></i><br>
    Message: ${this.markup}</span></div></a>`;
    mapMarkers.insertAdjacentHTML("afterbegin", markup);
    this._checkIfMarkerBoxEmpty();
  }

  loadSavedArray(array) {
    if (array.length == 0) return;
    const mapMarkers = document.querySelector(".map-markers-box");
    array.forEach((object) => {
      const markup = `<a href='#'><div class="marker"><span class="log-text">On ${object.date}<i class='bx bx-checkbox-minus close' ></i><br>
      Message: ${object.text}</span></div></a>`;
      mapMarkers.insertAdjacentHTML("afterbegin", markup);
    });
    this._loadSavedMarkers(array);
    this._checkIfMarkerBoxEmpty();
  }

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

  _checkIfLogClicked(event) {
    const logContainer = event.target.closest("div");
    if (!logContainer) return false;
    if (!logContainer.classList.contains("marker")) return false;
    if (event.target.classList.contains("close")) return false;
    this.logText = logContainer.textContent;
    return true;
  }

  _panToMarker(marker) {
    this._map.panTo(marker._latlng);
    marker.openPopup();
  }

  _deleteMarkerFromView(event) {
    if (!event.target.closest("i")) return;
    const close = event.target.closest("a");
    this.logText = close.querySelector(".marker").textContent;
    this._removeText(close);
  }

  _removeText(element) {
    const markerBox = document.querySelector(".map-markers-box");
    markerBox.removeChild(element);
  }

  removeMarker(marker) {
    if (!marker) return;
    marker.remove();
    this._checkIfMarkerBoxEmpty();
  }
}

export default new MapView();

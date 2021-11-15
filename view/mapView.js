import View from "./view.js";

class MapView extends View {
  _markup;
  removedText;
  fullText;
  prepareMarkerText = this._prepareMarkerText.bind(this);
  showForm = this._showForm.bind(this);
  renderMarker = this._renderMarker.bind(this);
  checkClickedOption = this._checkClickedOption.bind(this);
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

  addHoverEventHandler(fn) {
    const mapMarkers = document.querySelector(".map-markers-box");
    ["mouseout", "mouseover"].forEach((e) => {
      mapMarkers.addEventListener(e, fn);
    });
  }

  hoverFunction(e) {
    if (!e.target.closest("div").classList.contains("marker")) return;
    e.target.closest("div").classList.toggle("mousehover-map");
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
    submit.preventDefault();
    const markup = document.querySelector("input").value;
    this._markup = markup;
    this.currentMarker.addTo(this._map).bindPopup(markup).openPopup();
    this._hideForm();
  }
  _showForm() {
    const mapMarkers = document.querySelector(".map-markers-box");
    const markup = `
        <form class="form">
        <fieldset>
            <legend>Enter Log</legend>
            <input class='form' required /><br>
            <button type="submit" class="button">Save</button>
        </fieldset>
    </form>`;
    this._checkIfMarkerBoxEmpty();
    mapMarkers.insertAdjacentHTML("afterbegin", markup);
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

  addSubmitEventHandler(fn) {
    const mapMarkers = document.querySelector(".map-markers-box");
    mapMarkers.addEventListener("submit", fn);
  }

  renderText(date) {
    const mapMarkers = document.querySelector(".map-markers-box");
    const markup = `<a href='#'><div class="marker">On ${date}: <span class='close'>X</span><br>
    ${this._markup}</div></a>`;
    this.fullText = markup;
    mapMarkers.insertAdjacentHTML("afterbegin", markup);
  }

  _checkClickedOption(event) {
    console.log("kkk");
    if (event.target.closest("span")) {
      const close = event.target.closest("a");
      if (event.target.closest("span").classList.contains("close")) {
        this.removedText = close;
        this._removeMarker(close);
        return true;
      }
    }
    if (event.target.closest("a")) return true;
    return false;
  }

  _removeMarker(element) {
    const markerBox = document.querySelector(".map-markers-box");
    markerBox.removeChild(element);
  }
}

export default new MapView();

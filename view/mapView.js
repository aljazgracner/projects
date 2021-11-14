import View from "./view.js";

class MapView extends View {
  map = document.querySelector("#map");
  mapMarkers = document.querySelector(".map-markers");
  _renderHTML() {
    const markup = `
    <div class="map-markers">
        <div class="map-text">
            No saved markers yet. Start by clicking on map <br>
            <i class='bx bx-map'></i>
        </div>      
    </div>
    <div id="map"></div>
    `;
    this._contentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  addHoverEventHandler(fn) {
    console.log(document.querySelector("#map"));
    ["mouseout", "mouseover"].forEach((e) => {
      this.mapMarkers.addEventListener(e, fn);
    });
  }

  hoverFunction(e) {
    if (!e.target.closest("div").classList.contains("marker")) return;
    e.target.closest("div").classList.toggle("mousehover-map");
  }

  renderMap(location) {
    const map = L.map("map").setView(
      [location.latitude, location.longitude],
      15
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(map);
  }
}

export default new MapView();

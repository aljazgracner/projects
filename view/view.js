export default class View {
  _contentContainer = document.querySelector(".content-container");

  renderContent(clickedOption) {
    this._clearContentView();
    this._renderHTML();
  }

  _clearContentView() {
    this._contentContainer.innerHTML = "";
  }
}

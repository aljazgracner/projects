class HomeModule {
  isMobile;
  /** Checks user viewport width
   * @param {boolean} - true if mobile device.
   */
  checkForMobile() {
    return window.matchMedia("only screen and (max-width: 760px)").matches;
  }
}

const homeModule = new HomeModule();

export default homeModule;

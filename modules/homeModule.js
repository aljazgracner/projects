class HomeModule {
  isMobile;
  checkForMobile() {
    return window.matchMedia("only screen and (max-width: 760px)").matches;
  }
}

const homeModule = new HomeModule();

export default homeModule;

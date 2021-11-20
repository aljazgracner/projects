export const timeout = async function (seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

//random 10 second timeout if geolocation api doesnt load
export const apiTimeout = function () {
  return new Promise((resolve, reject) => setTimeout(reject, 10000));
};
